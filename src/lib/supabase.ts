import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserDeviceRow {
  id: string;
  device_id: string;
  device_name: string | null;
  user_agent: string | null;
  last_seen_at: string;
  created_at: string;
}

export interface RegisterDeviceResult {
  ok: boolean;
  error?: string;
  registered?: boolean;
  limit?: number;
  count?: number;
}
