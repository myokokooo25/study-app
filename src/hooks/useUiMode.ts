import { useEffect, useState } from 'react';
import type { UiMode } from '../types';

export function useUiMode() {
  const [uiMode, setUiMode] = useState<UiMode>(() => {
    const saved = localStorage.getItem('study-app-ui-mode');
    return saved === 'premium' ? 'premium' : 'classic';
  });

  useEffect(() => {
    localStorage.setItem('study-app-ui-mode', uiMode);
    document.documentElement.dataset.ui = uiMode;
  }, [uiMode]);

  return { uiMode, setUiMode };
}
