import { isSupabaseConfigured } from '../lib/supabase';

export function SetupRequiredPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Setup Required</p>
        <h1>App config missing</h1>
        <p className="subtitle">
          Supabase environment variables were not included in this build.
        </p>
        <div className="auth-message">
          GitHub repo → Settings → Secrets and variables → Actions
          <br />
          Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then re-run deploy.
        </div>
        <p className="subtitle">
          GitHub Pages → Settings → Pages → Source must be <strong>GitHub Actions</strong>,
          not &quot;Deploy from branch&quot;.
        </p>
        {!isSupabaseConfigured && (
          <p className="subtitle">Current build has no Supabase keys.</p>
        )}
      </div>
    </div>
  );
}
