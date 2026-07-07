import type { UiMode } from '../types';

interface Props {
  uiMode: UiMode;
  onChange: (mode: UiMode) => void;
  compact?: boolean;
}

export function UiModeToggle({ uiMode, onChange, compact = false }: Props) {
  const next = uiMode === 'classic' ? 'premium' : 'classic';

  return (
    <button
      type="button"
      className={`ui-mode-toggle ${compact ? 'compact' : ''}`}
      onClick={() => onChange(next)}
      title={next === 'premium' ? 'Switch to Premium UI' : 'Switch to Classic UI'}
    >
      <span className="ui-mode-toggle-icon">{uiMode === 'premium' ? '✦' : '◆'}</span>
      <span className="ui-mode-toggle-label">
        {uiMode === 'premium' ? 'Classic' : 'Premium'}
      </span>
    </button>
  );
}
