import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Public client keys — safe in frontend when RLS is enabled.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://kdulrcovfiqbsenevowc.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'sb_publishable_zdo0Etwvkd70Nnv2-sePng_ZM0r-Pon';

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}

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
