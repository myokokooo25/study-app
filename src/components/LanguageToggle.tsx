import type { LanguageMode } from '../types';
import { renderHtml } from '../utils';

interface Props {
  language: LanguageMode;
}

export function LanguageToggle({ language, setLanguage }: Props & {
  setLanguage: (mode: LanguageMode) => void;
}) {
  const options: { value: LanguageMode; label: string }[] = [
    { value: 'both', label: 'JP + MY' },
    { value: 'jp', label: '日本語' },
    { value: 'my', label: 'မြန်မာ' },
  ];

  return (
    <div className="language-toggle" role="group" aria-label="Language">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={language === option.value ? 'active' : ''}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

interface TextBlockProps {
  jp?: string;
  my?: string;
  language: LanguageMode;
  className?: string;
}

export function TextBlock({ jp, my, language, className = '' }: TextBlockProps) {
  return (
    <div className={`text-block ${className}`.trim()}>
      {(language === 'both' || language === 'jp') && jp && (
        <div className="text-jp" dangerouslySetInnerHTML={renderHtml(jp)} />
      )}
      {(language === 'both' || language === 'my') && my && (
        <div className="text-my">{my}</div>
      )}
    </div>
  );
}
