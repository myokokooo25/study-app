import { useState } from 'react';
import type { AppTab, LanguageMode, StudyRecord, UiMode } from '../../types';
import { UiModeToggle } from '../UiModeToggle';
import { VocabularyPage } from '../VocabularyPage';
import { PremiumDashboard } from './PremiumDashboard';
import { PremiumLearn } from './PremiumLearn';
import { PremiumRecord } from './PremiumRecord';

type PremiumSection = 'home' | AppTab;

interface Props {
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  record: StudyRecord;
  stats: ReturnType<typeof import('../../studyRecord').getOverallStats>;
  language: LanguageMode;
  setLanguage: (mode: LanguageMode) => void;
  userEmail: string;
  onSignOut: () => Promise<void>;
  onSelectQuestion: (chapterId: number, serial: number) => void;
}

const navItems: { id: PremiumSection; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'learn', label: '問題', icon: '✎' },
  { id: 'vocab', label: '単語', icon: '文' },
  { id: 'record', label: '記録', icon: '◔' },
];

export function PremiumShell({
  uiMode,
  setUiMode,
  record,
  stats,
  language,
  setLanguage,
  userEmail,
  onSignOut,
  onSelectQuestion,
}: Props) {
  const [section, setSection] = useState<PremiumSection>('home');
  const [activeChapterId, setActiveChapterId] = useState(1);

  const goLearn = (chapterId: number) => {
    setActiveChapterId(chapterId);
    setSection('learn');
  };

  return (
    <div className="premium-app">
      <aside className="premium-sidebar">
        <div className="premium-brand">
          <span className="premium-brand-mark">✦</span>
          <div>
            <strong>Premium</strong>
            <p>鉄骨製作管理技術者</p>
          </div>
        </div>

        <nav className="premium-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={section === item.id ? 'active' : ''}
              onClick={() => setSection(item.id)}
            >
              <span className="premium-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="premium-sidebar-foot">
          <UiModeToggle uiMode={uiMode} onChange={setUiMode} compact />
          <button type="button" className="premium-signout" onClick={() => void onSignOut()}>
            Sign out
          </button>
        </div>
      </aside>

      <div className="premium-main">
        <header className="premium-topbar">
          <div>
            <p className="premium-kicker">鉄骨製作管理技術者試験</p>
            <h1>{navItems.find((item) => item.id === section)?.label ?? 'Home'}</h1>
          </div>
          <div className="premium-topbar-right">
            <span className="premium-chip">{userEmail}</span>
            <span className="premium-chip accent">🔥 {stats.streak}</span>
            <span className="premium-chip accent">⚡ {stats.totalXp}</span>
          </div>
        </header>

        <main className="premium-content">
          {section === 'home' && (
            <PremiumDashboard
              record={record}
              stats={stats}
              onSelectChapter={goLearn}
              onSelectQuestion={onSelectQuestion}
            />
          )}
          {section === 'learn' && (
            <PremiumLearn
              record={record}
              activeChapterId={activeChapterId}
              onChapterChange={setActiveChapterId}
              onSelectQuestion={onSelectQuestion}
            />
          )}
          {section === 'vocab' && (
            <VocabularyPage
              language={language}
              setLanguage={setLanguage}
              userEmail={userEmail}
              onSignOut={onSignOut}
              embedded
            />
          )}
          {section === 'record' && <PremiumRecord record={record} stats={stats} />}
        </main>
      </div>

      <nav className="premium-mobile-nav" aria-label="Premium navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={section === item.id ? 'active' : ''}
            onClick={() => setSection(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
