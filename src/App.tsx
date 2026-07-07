import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { BottomNav } from './components/BottomNav';
import { DeviceLimitPage } from './components/DeviceLimitPage';
import { HomePage } from './components/HomePage';
import { QuizPage } from './components/QuizPage';
import { RecordPage } from './components/RecordPage';
import { useAuth } from './auth/AuthContext';
import { useStudyRecord } from './studyRecord';
import { useLanguageMode } from './utils';
import type { AppTab } from './types';
import './App.css';

type View =
  | { type: 'tabs' }
  | { type: 'quiz'; chapterId: number; startIndex: number };

function AppContent() {
  const { user, phase, signOut } = useAuth();
  const { language, setLanguage } = useLanguageMode();
  const { record, submitAnswer, resetChapter, stats, cloudReady } = useStudyRecord(
    user?.id ?? null,
  );
  const [tab, setTab] = useState<AppTab>('learn');
  const [view, setView] = useState<View>({ type: 'tabs' });

  if (phase === 'loading' || (user && !cloudReady)) {
    return (
      <div className="auth-shell">
        <div className="auth-card loading-card">
          <p className="eyebrow">Loading</p>
          <h1>Please wait...</h1>
        </div>
      </div>
    );
  }

  if (phase === 'signed_out') {
    return <AuthPage />;
  }

  if (phase === 'device_limit') {
    return <DeviceLimitPage />;
  }

  if (view.type === 'quiz') {
    return (
      <QuizPage
        chapterId={view.chapterId}
        startIndex={view.startIndex}
        language={language}
        record={record}
        stats={stats}
        onSubmitAnswer={submitAnswer}
        onResetChapter={resetChapter}
        onBack={() => setView({ type: 'tabs' })}
      />
    );
  }

  return (
    <div className="app-shell">
      {tab === 'learn' ? (
        <HomePage
          language={language}
          setLanguage={setLanguage}
          record={record}
          stats={stats}
          userEmail={user?.email ?? ''}
          onSignOut={signOut}
          onSelectQuestion={(chapterId, serial) =>
            setView({ type: 'quiz', chapterId, startIndex: serial - 1 })
          }
        />
      ) : (
        <RecordPage
          record={record}
          language={language}
          setLanguage={setLanguage}
          stats={stats}
          userEmail={user?.email ?? ''}
          onSignOut={signOut}
        />
      )}
      <BottomNav activeTab={tab} onChange={setTab} />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
