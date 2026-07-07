import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  createStudyRoom,
  joinStudyRoomByCode,
  type StudyRoom,
} from '../lib/studyRoomApi';
import { useStudyRoom } from '../hooks/useStudyRoom';

interface Props {
  user: User;
  embedded?: boolean;
}

function getDisplayName(user: User) {
  const meta = user.user_metadata?.display_name;
  if (typeof meta === 'string' && meta.trim()) {
    return meta.trim();
  }
  return user.email?.split('@')[0] ?? 'Student';
}

function RemoteVideo({
  stream,
  label,
}: {
  stream: MediaStream;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="together-video-tile">
      <video ref={ref} autoPlay playsInline />
      <span>{label}</span>
    </div>
  );
}

function RoomView({
  room,
  user,
  onLeaveLobby,
}: {
  room: StudyRoom;
  user: User;
  onLeaveLobby: () => void;
}) {
  const displayName = getDisplayName(user);
  const {
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
    startVoiceCall,
    startVideoCall,
    stopCall,
    toggleMic,
    toggleCamera,
    leaveRoom,
  } = useStudyRoom({
    room,
    userId: user.id,
    displayName,
    onLeave: onLeaveLobby,
  });

  const copyCode = async () => {
    await navigator.clipboard.writeText(room.code);
  };

  return (
    <div className="together-room">
      <header className="together-room-header">
        <div>
          <h2>{room.name}</h2>
          <button type="button" className="together-code-btn" onClick={() => void copyCode()}>
            Room code: <strong>{room.code}</strong> · Copy
          </button>
        </div>
        <button type="button" className="duo-btn secondary compact" onClick={() => void leaveRoom()}>
          Leave room
        </button>
      </header>

      {error && <p className="auth-message">{error}</p>}

      <section className="together-call-panel">
        <div className="together-video-grid">
          <div className={`together-video-tile local ${cameraOn ? '' : 'camera-off'}`}>
            <video ref={localVideoRef} autoPlay playsInline muted />
            <span>You{displayName ? ` · ${displayName}` : ''}</span>
          </div>
          {Object.entries(remoteStreams).map(([peerId, stream]) => {
            const member = members.find((item) => item.user_id === peerId);
            return (
              <RemoteVideo
                key={peerId}
                stream={stream}
                label={member?.display_name ?? 'Friend'}
              />
            );
          })}
        </div>

        <div className="together-call-controls">
          {!callActive ? (
            <>
              <button type="button" className="duo-btn primary" onClick={() => void startVoiceCall()}>
                Voice Call
              </button>
              <button type="button" className="duo-btn secondary" onClick={() => void startVideoCall()}>
                Video Call
              </button>
            </>
          ) : (
            <>
              <button type="button" className={`together-control ${micOn ? '' : 'off'}`} onClick={toggleMic}>
                {micOn ? '🎤 Mic' : '🔇 Muted'}
              </button>
              <button type="button" className={`together-control ${cameraOn ? '' : 'off'}`} onClick={() => void toggleCamera()}>
                {cameraOn ? '📹 Video' : '📷 Off'}
              </button>
              <button type="button" className="together-control danger" onClick={stopCall}>
                End call
              </button>
            </>
          )}
        </div>
      </section>

      <section className="together-members">
        <h3>Online · {members.length}</h3>
        <div className="together-member-list">
          {members.map((member) => (
            <span key={member.user_id} className="together-member-chip">
              {member.display_name}
              {member.user_id === user.id ? ' (you)' : ''}
            </span>
          ))}
        </div>
      </section>

      <section className="together-chat">
        <h3>Chat</h3>
        <div className="together-chat-log">
          {messages.length === 0 ? (
            <p className="together-chat-empty">Say hello to your study group.</p>
          ) : (
            messages.map((item) => (
              <article
                key={item.id}
                className={`together-chat-item ${item.user_id === user.id ? 'mine' : ''}`}
              >
                <strong>{item.display_name}</strong>
                <p>{item.message}</p>
              </article>
            ))
          )}
        </div>
        <form
          className="together-chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            void sendChat();
          }}
        >
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="duo-btn primary compact">
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

export function StudyTogetherPage({ user, embedded = false }: Props) {
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const displayName = getDisplayName(user);

  const createRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const created = await createStudyRoom({
        userId: user.id,
        displayName,
        roomName,
      });
      setRoom(created);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create room.');
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const joined = await joinStudyRoomByCode({
        userId: user.id,
        displayName,
        code: joinCode,
      });
      setRoom(joined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not join room.');
    } finally {
      setLoading(false);
    }
  };

  if (room) {
    return <RoomView room={room} user={user} onLeaveLobby={() => setRoom(null)} />;
  }

  return (
    <div className={`together-page ${embedded ? 'embedded' : ''}`}>
      {!embedded && (
        <header className="together-hero">
          <p className="eyebrow">Study Together</p>
          <h1>သူငယ်ချင်းနဲ့ အတူလေ့လာပါ</h1>
          <p className="subtitle">Chat · Voice Call · Video Call</p>
        </header>
      )}

      {error && <p className="auth-message">{error}</p>}

      <section className="together-lobby-card">
        <h2>Create room</h2>
        <label>
          Room name
          <input
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            placeholder="Exam study group"
          />
        </label>
        <button type="button" className="duo-btn primary" disabled={loading} onClick={() => void createRoom()}>
          {loading ? 'Please wait...' : 'Create & share code'}
        </button>
      </section>

      <section className="together-lobby-card">
        <h2>Join room</h2>
        <label>
          Room code
          <input
            value={joinCode}
            onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
          />
        </label>
        <button type="button" className="duo-btn secondary" disabled={loading || !joinCode.trim()} onClick={() => void joinRoom()}>
          Join friends
        </button>
      </section>

      <p className="together-tip">
        Create a room, copy the 6-letter code, and send it to friends. They join with the same code to chat and call together.
      </p>
    </div>
  );
}
