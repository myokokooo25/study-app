import type { UiMode } from '../types';

interface Props {
  uiMode: UiMode;
  onChange: (mode: UiMode) => void;
  compact?: boolean;
}

export function UiModeToggle({ uiMode, onChange, compact = false }: Props) {
  const next = uiMode === 'classic' ? 'premium' : 'classic';
  const goingClassic = uiMode === 'premium';

  return (
    <button
      type="button"
      className={`ui-mode-toggle ${compact ? 'compact' : ''} ${goingClassic ? 'to-classic' : 'to-premium'}`}
      onClick={() => onChange(next)}
      title={goingClassic ? 'Switch to Classic UI' : 'Switch to Premium UI'}
    >
      <span className="ui-mode-toggle-icon">{uiMode === 'premium' ? '◆' : '✦'}</span>
      <span className="ui-mode-toggle-label">
        {goingClassic ? 'Classic UI' : 'Premium UI'}
      </span>
    </button>
  );
}
