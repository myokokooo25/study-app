const DEVICE_ID_KEY = 'study-app-device-id';

function createDeviceId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getDeviceId() {
  const existing = localStorage.getItem(DEVICE_ID_KEY);
  if (existing) {
    return existing;
  }

  const next = createDeviceId();
  localStorage.setItem(DEVICE_ID_KEY, next);
  return next;
}

export function getDeviceLabel() {
  const ua = navigator.userAgent;

  if (/iPhone/i.test(ua)) {
    return 'iPhone';
  }
  if (/iPad/i.test(ua)) {
    return 'iPad';
  }
  if (/Android/i.test(ua)) {
    return 'Android';
  }
  if (/Windows/i.test(ua)) {
    return 'Windows PC';
  }
  if (/Macintosh/i.test(ua)) {
    return 'Mac';
  }

  return 'Browser';
}
