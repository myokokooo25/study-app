import { useRef, useState, type FormEvent } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useAuth } from '../auth/AuthContext';

type AuthMode = 'sign_in' | 'sign_up';
type CaptchaProvider = 'turnstile' | 'hcaptcha' | 'none';

const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const hcaptchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

function getCaptchaProvider(): CaptchaProvider {
  if (turnstileSiteKey) {
    return 'turnstile';
  }
  if (hcaptchaSiteKey) {
    return 'hcaptcha';
  }
  return 'none';
}

function friendlyAuthError(message: string, mode: AuthMode) {
  const lower = message.toLowerCase();
  if (lower.includes('captcha')) {
    return 'Supabase CAPTCHA is still ON. Turn it OFF in Supabase Dashboard → Authentication → Bot and Abuse Protection.';
  }
  if (lower.includes('already registered') || lower.includes('already been registered')) {
    return 'This email is already registered. Please use Sign In instead.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please confirm your email first, then use Sign In.';
  }
  if (lower.includes('invalid login credentials') && mode === 'sign_in') {
    return 'Email or password is wrong. If you just signed up, confirm your email first.';
  }
  return message;
}

export function AuthPage() {
  const { signIn, signUp } = useAuth();
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const hcaptchaRef = useRef<HCaptcha>(null);
  const captchaProvider = getCaptchaProvider();
  const [mode, setMode] = useState<AuthMode>('sign_in');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const resetCaptcha = () => {
    setCaptchaToken(null);
    turnstileRef.current?.reset();
    hcaptchaRef.current?.resetCaptcha();
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    resetCaptcha();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (captchaProvider !== 'none' && !captchaToken) {
      setErrorMessage('Please complete the CAPTCHA challenge first.');
      setSuccessMessage(null);
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (mode === 'sign_up') {
      const result = await signUp(email.trim(), password, displayName.trim(), captchaToken ?? undefined);
      setLoading(false);

      if (result.error) {
        setErrorMessage(friendlyAuthError(result.error, 'sign_up'));
        resetCaptcha();
        return;
      }

      if (result.needsEmailConfirm) {
        setSuccessMessage(
          'Account created. Check your email inbox (and spam folder), click the confirm link, then Sign In.',
        );
        setMode('sign_in');
        setPassword('');
        resetCaptcha();
        return;
      }

      setSuccessMessage('Account created successfully. You are now signed in.');
      resetCaptcha();
      return;
    }

    const signInError = await signIn(email.trim(), password, captchaToken ?? undefined);
    setLoading(false);

    if (signInError) {
      setErrorMessage(friendlyAuthError(signInError, 'sign_in'));
      resetCaptcha();
      return;
    }

    resetCaptcha();
  };

  const submitDisabled = loading || (captchaProvider !== 'none' && !captchaToken);

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">鉄骨製作管理技術者試験</p>
        <h1>{mode === 'sign_up' ? 'Sign Up' : 'Sign In'}</h1>
        <p className="subtitle">
          Account 1 ခုလျှင် device 3 ခုသာ အသုံးပြုနိုင်ပါသည်။
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === 'sign_in' ? 'active' : ''}
            onClick={() => switchMode('sign_in')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={mode === 'sign_up' ? 'active' : ''}
            onClick={() => switchMode('sign_up')}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'sign_up' && (
            <label>
              Name
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              minLength={6}
              required
            />
          </label>

          {captchaProvider === 'turnstile' && (
            <div className="captcha-wrap">
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey!}
                onSuccess={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
                options={{ theme: 'light', size: 'flexible' }}
              />
            </div>
          )}

          {captchaProvider === 'hcaptcha' && (
            <div className="captcha-wrap">
              <HCaptcha
                ref={hcaptchaRef}
                sitekey={hcaptchaSiteKey!}
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
              />
            </div>
          )}

          {successMessage && <p className="auth-success">{successMessage}</p>}
          {errorMessage && <p className="auth-message">{errorMessage}</p>}

          <button type="submit" className="duo-btn primary" disabled={submitDisabled}>
            {loading ? 'Please wait...' : mode === 'sign_up' ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
