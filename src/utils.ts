import { useEffect, useState } from 'react';
import type { LanguageMode } from './types';

export function useLanguageMode() {
  const [language, setLanguage] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('study-app-language');
    return saved === 'jp' || saved === 'my' || saved === 'both' ? saved : 'both';
  });

  useEffect(() => {
    localStorage.setItem('study-app-language', language);
  }, [language]);

  return { language, setLanguage };
}

export function renderHtml(html: string) {
  return { __html: html };
}
