import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export function DeviceLimitPage() {
  const { devices, deviceId, removeDevice, refreshDeviceAccess, signOut } = useAuth();
  const [message, setMessage] = useState<string | null>(
    'Device limit reached. This account can only use 3 devices. Remove one old device to continue.',
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRemove = async (targetDeviceId: string) => {
    setLoadingId(targetDeviceId);
    setMessage(null);
    const result = await removeDevice(targetDeviceId);
    setLoadingId(null);
    if (result) {
      setMessage(result);
    }
  };

  const handleRetry = async () => {
    setMessage(null);
    const result = await refreshDeviceAccess();
    if (result) {
      setMessage(result);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Device Limit</p>
        <h1>3 Device Limit</h1>
        <p className="subtitle">
          Account တစ်ခုကို phone/tablet/PC စုစုပေါင်း device 3 ခုသာ သုံးနိုင်ပါသည်။
        </p>

        {message && <p className="auth-message">{message}</p>}

        <div className="device-list">
          {devices.map((device) => (
            <article key={device.id} className="device-item">
              <div>
                <strong>
                  {device.device_name ?? 'Device'}
                  {device.device_id === deviceId ? ' (This device)' : ''}
                </strong>
                <p>Last used: {new Date(device.last_seen_at).toLocaleString()}</p>
              </div>
              <button
                type="button"
                className="duo-btn secondary compact"
                disabled={loadingId === device.device_id}
                onClick={() => handleRemove(device.device_id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <div className="auth-actions">
          <button type="button" className="duo-btn primary" onClick={handleRetry}>
            TRY AGAIN
          </button>
          <button type="button" className="text-link" onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
