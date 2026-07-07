import type { AppTab } from '../types';

interface Props {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

export function BottomNav({ activeTab, onChange }: Props) {
  return (
    <nav className="bottom-nav">
      <button
        type="button"
        className={activeTab === 'learn' ? 'active' : ''}
        onClick={() => onChange('learn')}
      >
        <span className="nav-icon">🏠</span>
        <span>Learn</span>
      </button>
      <button
        type="button"
        className={activeTab === 'vocab' ? 'active' : ''}
        onClick={() => onChange('vocab')}
      >
        <span className="nav-icon">📚</span>
        <span>Vocab</span>
      </button>
      <button
        type="button"
        className={activeTab === 'record' ? 'active' : ''}
        onClick={() => onChange('record')}
      >
        <span className="nav-icon">📊</span>
        <span>Record</span>
      </button>
    </nav>
  );
}
