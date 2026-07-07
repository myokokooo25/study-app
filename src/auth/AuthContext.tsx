import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { getDeviceId, getDeviceLabel } from './deviceId';
import {
  getSupabaseClient,
  isSupabaseConfigured,
  type RegisterDeviceResult,
  type UserDeviceRow,
} from '../lib/supabase';

type AuthPhase = 'loading' | 'signed_out' | 'device_limit' | 'ready';

interface AuthContextValue {
  user: User | null;
  phase: AuthPhase;
  devices: UserDeviceRow[];
  deviceId: string;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    captchaToken?: string,
  ) => Promise<string | null>;
  signIn: (email: string, password: string, captchaToken?: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshDeviceAccess: () => Promise<string | null>;
  removeDevice: (deviceId: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function registerCurrentDevice(): Promise<RegisterDeviceResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase.rpc('register_device', {
    p_device_id: getDeviceId(),
    p_device_name: getDeviceLabel(),
    p_user_agent: navigator.userAgent,
  });

  if (error) {
    throw error;
  }

  return data as RegisterDeviceResult;
}

async function loadDevices() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('user_devices')
    .select('id, device_id, device_name, user_agent, last_seen_at, created_at')
    .order('last_seen_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as UserDeviceRow[];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [phase, setPhase] = useState<AuthPhase>('loading');
  const [devices, setDevices] = useState<UserDeviceRow[]>([]);
  const deviceId = useMemo(() => getDeviceId(), []);

  const refreshDeviceAccess = useCallback(async () => {
    const result = await registerCurrentDevice();

    if (result.ok) {
      setPhase('ready');
      setDevices(await loadDevices());
      return null;
    }

    if (result.error === 'device_limit') {
      setPhase('device_limit');
      setDevices(await loadDevices());
      return 'Device limit reached. You can use only 3 devices. Remove one device below, then try again.';
    }

    return result.error ?? 'Unable to register this device.';
  }, []);

  const bootstrapSession = useCallback(async (nextUser: User | null) => {
    const supabase = getSupabaseClient();
    setUser(nextUser);

    if (!nextUser) {
      setDevices([]);
      setPhase('signed_out');
      return;
    }

    setPhase('loading');
    const errorMessage = await refreshDeviceAccess();
    if (errorMessage && errorMessage.includes('Device limit')) {
      return;
    }
    if (errorMessage) {
      setPhase('signed_out');
      await supabase?.auth.signOut();
      setUser(null);
    }
  }, [refreshDeviceAccess]);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setPhase('signed_out');
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }
      bootstrapSession(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      bootstrapSession(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [bootstrapSession]);

  const signUp = useCallback(async (
    email: string,
    password: string,
    displayName: string,
    captchaToken?: string,
  ) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return 'Supabase is not configured.';
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
        captchaToken,
      },
    });

    if (error) {
      return error.message;
    }

    if (!data.session) {
      return 'Account created. Please check your email to confirm, then sign in.';
    }

    return null;
  }, []);

  const signIn = useCallback(async (email: string, password: string, captchaToken?: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return 'Supabase is not configured.';
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });
    return error?.message ?? null;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    await supabase?.auth.signOut();
    setUser(null);
    setDevices([]);
    setPhase('signed_out');
  }, []);

  const removeDevice = useCallback(async (targetDeviceId: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return 'Supabase is not configured.';
    }

    const { data, error } = await supabase.rpc('remove_user_device', {
      p_device_id: targetDeviceId,
    });

    if (error) {
      return error.message;
    }

    if (!(data as { ok?: boolean }).ok) {
      return 'Unable to remove device.';
    }

    return refreshDeviceAccess();
  }, [refreshDeviceAccess]);

  const value = useMemo(
    () => ({
      user,
      phase,
      devices,
      deviceId,
      signUp,
      signIn,
      signOut,
      refreshDeviceAccess,
      removeDevice,
    }),
    [user, phase, devices, deviceId, signUp, signIn, signOut, refreshDeviceAccess, removeDevice],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export { isSupabaseConfigured };
