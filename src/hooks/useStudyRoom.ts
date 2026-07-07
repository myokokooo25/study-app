import { useCallback, useEffect, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { getSupabaseClient } from '../lib/supabase';
import {
  createPeerConnection,
  fetchRoomMembers,
  fetchRoomMessages,
  getRoomChannelName,
  leaveStudyRoom,
  sendRoomMessage,
  type SignalEvent,
  type StudyRoom,
  type StudyRoomMember,
  type StudyRoomMessage,
} from '../lib/studyRoomApi';

interface UseStudyRoomOptions {
  room: StudyRoom | null;
  userId: string;
  displayName: string;
  onLeave: () => void;
}

export function useStudyRoom({ room, userId, displayName, onLeave }: UseStudyRoomOptions) {
  const [members, setMembers] = useState<StudyRoomMember[]>([]);
  const [messages, setMessages] = useState<StudyRoomMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const pendingCandidatesRef = useRef<Map<string, RTCIceCandidateInit[]>>(new Map());

  const refreshMembers = useCallback(async () => {
    if (!room) {
      return;
    }
    const rows = await fetchRoomMembers(room.id);
    setMembers(rows);
  }, [room]);

  const refreshMessages = useCallback(async () => {
    if (!room) {
      return;
    }
    const rows = await fetchRoomMessages(room.id);
    setMessages(rows);
  }, [room]);

  const broadcastSignal = useCallback(
    (payload: SignalEvent) => {
      channelRef.current?.send({
        type: 'broadcast',
        event: 'signal',
        payload,
      });
    },
    [],
  );

  const attachLocalStream = useCallback(async (video: boolean) => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video,
    });
    localStreamRef.current = stream;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  }, []);

  const addRemoteStream = useCallback((peerId: string, stream: MediaStream) => {
    setRemoteStreams((current) => ({ ...current, [peerId]: stream }));
  }, []);

  const removeRemoteStream = useCallback((peerId: string) => {
    setRemoteStreams((current) => {
      const next = { ...current };
      delete next[peerId];
      return next;
    });
  }, []);

  const createOfferForPeer = useCallback(
    async (peerId: string) => {
      if (!localStreamRef.current || peerId === userId) {
        return;
      }
      if (peersRef.current.has(peerId)) {
        return;
      }

      const pc = createPeerConnection();
      peersRef.current.set(peerId, pc);

      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          broadcastSignal({
            from: userId,
            to: peerId,
            type: 'ice',
            data: event.candidate.toJSON(),
          });
        }
      };

      pc.ontrack = (event) => {
        const [stream] = event.streams;
        if (stream) {
          addRemoteStream(peerId, stream);
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
          pc.close();
          peersRef.current.delete(peerId);
          removeRemoteStream(peerId);
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      broadcastSignal({
        from: userId,
        to: peerId,
        type: 'offer',
        data: offer,
      });
    },
    [addRemoteStream, broadcastSignal, removeRemoteStream, userId],
  );

  const handleSignal = useCallback(
    async (payload: SignalEvent) => {
      if (!room || payload.from === userId) {
        return;
      }
      if (payload.to && payload.to !== userId) {
        return;
      }

      if (payload.type === 'join') {
        if (callActive && localStreamRef.current) {
          await createOfferForPeer(payload.from);
        }
        await refreshMembers();
        return;
      }

      if (payload.type === 'leave') {
        const pc = peersRef.current.get(payload.from);
        pc?.close();
        peersRef.current.delete(payload.from);
        removeRemoteStream(payload.from);
        await refreshMembers();
        return;
      }

      if (!callActive) {
        return;
      }

      if (payload.type === 'offer') {
        if (!localStreamRef.current) {
          return;
        }
        let pc = peersRef.current.get(payload.from);
        if (!pc) {
          pc = createPeerConnection();
          peersRef.current.set(payload.from, pc);
          localStreamRef.current.getTracks().forEach((track) => {
            pc!.addTrack(track, localStreamRef.current!);
          });
          pc.onicecandidate = (event) => {
            if (event.candidate) {
              broadcastSignal({
                from: userId,
                to: payload.from,
                type: 'ice',
                data: event.candidate.toJSON(),
              });
            }
          };
          pc.ontrack = (event) => {
            const [stream] = event.streams;
            if (stream) {
              addRemoteStream(payload.from, stream);
            }
          };
        }
        await pc.setRemoteDescription(payload.data as RTCSessionDescriptionInit);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        broadcastSignal({
          from: userId,
          to: payload.from,
          type: 'answer',
          data: answer,
        });
        return;
      }

      if (payload.type === 'answer') {
        const pc = peersRef.current.get(payload.from);
        if (pc && payload.data) {
          await pc.setRemoteDescription(payload.data as RTCSessionDescriptionInit);
        }
        return;
      }

      if (payload.type === 'ice') {
        const pc = peersRef.current.get(payload.from);
        const candidate = payload.data as RTCIceCandidateInit;
        if (pc && pc.remoteDescription) {
          await pc.addIceCandidate(candidate);
        } else {
          const queue = pendingCandidatesRef.current.get(payload.from) ?? [];
          queue.push(candidate);
          pendingCandidatesRef.current.set(payload.from, queue);
        }
      }
    },
    [
      addRemoteStream,
      broadcastSignal,
      callActive,
      createOfferForPeer,
      refreshMembers,
      removeRemoteStream,
      room,
      userId,
    ],
  );

  const startCall = useCallback(
    async (withVideo: boolean) => {
      setError(null);
      try {
        await attachLocalStream(withVideo);
        setCameraOn(withVideo);
        setMicOn(true);
        setCallActive(true);
        broadcastSignal({ from: userId, type: 'join' });
        const others = members.filter((member) => member.user_id !== userId);
        for (const member of others) {
          await createOfferForPeer(member.user_id);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Could not access microphone/camera. Please allow permission.',
        );
      }
    },
    [attachLocalStream, broadcastSignal, createOfferForPeer, members, userId],
  );

  const stopCall = useCallback(() => {
    broadcastSignal({ from: userId, type: 'leave' });
    peersRef.current.forEach((pc) => pc.close());
    peersRef.current.clear();
    pendingCandidatesRef.current.clear();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setRemoteStreams({});
    setCallActive(false);
    setCameraOn(false);
  }, [broadcastSignal, userId]);

  const toggleMic = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) {
      return;
    }
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setMicOn(stream.getAudioTracks()[0]?.enabled ?? false);
  }, []);

  const toggleCamera = useCallback(async () => {
    if (!callActive) {
      await startCall(true);
      return;
    }
    const stream = localStreamRef.current;
    if (!stream) {
      return;
    }
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length === 0) {
      await startCall(true);
      return;
    }
    const next = !videoTracks[0].enabled;
    videoTracks.forEach((track) => {
      track.enabled = next;
    });
    setCameraOn(next);
  }, [callActive, startCall]);

  const sendChat = useCallback(async () => {
    if (!room) {
      return;
    }
    try {
      await sendRoomMessage({
        roomId: room.id,
        userId,
        displayName,
        message: chatInput,
      });
      setChatInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send message.');
    }
  }, [chatInput, displayName, room, userId]);

  const leaveRoom = useCallback(async () => {
    if (room) {
      stopCall();
      await leaveStudyRoom(room.id, userId);
    }
    channelRef.current?.unsubscribe();
    channelRef.current = null;
    onLeave();
  }, [onLeave, room, stopCall, userId]);

  useEffect(() => {
    if (!room) {
      return;
    }

    refreshMembers();
    refreshMessages();

    const supabase = getSupabaseClient();
    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel(getRoomChannelName(room.id), {
        config: { broadcast: { self: false } },
      })
      .on('broadcast', { event: 'signal' }, ({ payload }) => {
        void handleSignal(payload as SignalEvent);
      })
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'study_room_messages', filter: `room_id=eq.${room.id}` },
        (payload) => {
          const row = payload.new as StudyRoomMessage;
          setMessages((current) =>
            current.some((item) => item.id === row.id) ? current : [...current, row],
          );
        },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'study_room_members', filter: `room_id=eq.${room.id}` },
        () => {
          void refreshMembers();
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          broadcastSignal({ from: userId, type: 'join' });
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  }, [broadcastSignal, handleSignal, refreshMembers, refreshMessages, room, userId]);

  useEffect(() => {
    if (!callActive || members.length === 0) {
      return;
    }
    const others = members.filter((member) => member.user_id !== userId);
    for (const member of others) {
      void createOfferForPeer(member.user_id);
    }
  }, [callActive, createOfferForPeer, members, userId]);

  return {
    members,
    messages,
    chatInput,
    setChatInput,
    sendChat,
    error,
    micOn,
    cameraOn,
    callActive,
    remoteStreams,
    localVideoRef,
    startVoiceCall: () => startCall(false),
    startVideoCall: () => startCall(true),
    stopCall,
    toggleMic,
    toggleCamera,
    leaveRoom,
  };
}
