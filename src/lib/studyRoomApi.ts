import { getSupabaseClient } from './supabase';

export interface StudyRoom {
  id: string;
  code: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface StudyRoomMember {
  room_id: string;
  user_id: string;
  display_name: string;
  joined_at: string;
}

export interface StudyRoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  display_name: string;
  message: string;
  created_at: string;
}

function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createStudyRoom(input: {
  userId: string;
  displayName: string;
  roomName?: string;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = randomCode();
    const { data: room, error } = await supabase
      .from('study_rooms')
      .insert({
        code,
        name: input.roomName?.trim() || 'Study Room',
        created_by: input.userId,
      })
      .select('*')
      .single();

    if (!error && room) {
      const { error: memberInsertError } = await supabase.from('study_room_members').insert({
        room_id: room.id,
        user_id: input.userId,
        display_name: input.displayName,
      });
      if (memberInsertError) {
        throw new Error(memberInsertError.message);
      }
      return room as StudyRoom;
    }
  }

  throw new Error('Could not create room. Please try again.');
}

export async function joinStudyRoomByCode(input: {
  userId: string;
  displayName: string;
  code: string;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const normalized = input.code.trim().toUpperCase();
  const { data: room, error: roomError } = await supabase
    .from('study_rooms')
    .select('*')
    .eq('code', normalized)
    .single();

  if (roomError || !room) {
    throw new Error('Room not found. Check the code and try again.');
  }

  const { error: memberError } = await supabase.from('study_room_members').insert({
    room_id: room.id,
    user_id: input.userId,
    display_name: input.displayName,
  });

  if (memberError) {
    if (memberError.code === '23505') {
      const { error: updateError } = await supabase
        .from('study_room_members')
        .update({ display_name: input.displayName })
        .eq('room_id', room.id)
        .eq('user_id', input.userId);
      if (updateError) {
        throw new Error(updateError.message);
      }
    } else {
      throw new Error(memberError.message);
    }
  }

  return room as StudyRoom;
}

export async function leaveStudyRoom(roomId: string, userId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return;
  }
  await supabase
    .from('study_room_members')
    .delete()
    .eq('room_id', roomId)
    .eq('user_id', userId);
}

export async function fetchRoomMembers(roomId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('study_room_members')
    .select('*')
    .eq('room_id', roomId)
    .order('joined_at', { ascending: true });
  if (error) {
    throw error;
  }
  return (data ?? []) as StudyRoomMember[];
}

export async function fetchRoomMessages(roomId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }
  const { data, error } = await supabase
    .from('study_room_messages')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })
    .limit(200);
  if (error) {
    throw error;
  }
  return (data ?? []) as StudyRoomMessage[];
}

export async function sendRoomMessage(input: {
  roomId: string;
  userId: string;
  displayName: string;
  message: string;
}) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }
  const trimmed = input.message.trim();
  if (!trimmed) {
    return null;
  }
  const { data, error } = await supabase
    .from('study_room_messages')
    .insert({
      room_id: input.roomId,
      user_id: input.userId,
      display_name: input.displayName,
      message: trimmed,
    })
    .select('*')
    .single();
  if (error) {
    throw error;
  }
  return data as StudyRoomMessage;
}

export type SignalEvent = {
  from: string;
  to?: string;
  type: 'offer' | 'answer' | 'ice' | 'join' | 'leave';
  data?: unknown;
};

export function getRoomChannelName(roomId: string) {
  return `study-room:${roomId}`;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

export function createPeerConnection() {
  return new RTCPeerConnection({ iceServers: ICE_SERVERS });
}

export { ICE_SERVERS };
