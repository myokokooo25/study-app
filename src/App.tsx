import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { BottomNav } from './components/BottomNav';
import { ConfirmDialog } from './components/ConfirmDialog';
import { DeviceLimitPage } from './components/DeviceLimitPage';
import { HomePage } from './components/HomePage';
import { QuizPage } from './components/QuizPage';
import { RecordPage } from './components/RecordPage';
import { VocabularyPage } from './components/VocabularyPage';
import { UiModeToggle } from './components/UiModeToggle';
import { PremiumShell } from './components/premium/PremiumShell';
import { useAuth } from './auth/AuthContext';
import { useStudyRecord } from './studyRecord';
import { useLanguageMode } from './utils';
import { useUiMode } from './hooks/useUiMode';
import type { AppTab } from './types';
import './App.css';
import './premium.css';

type View =
  | { type: 'tabs' }
  | { type: 'quiz'; chapterId: number; startIndex: number };

function AppContent() {
  const { user, phase, signOut } = useAuth();
  const { language, setLanguage } = useLanguageMode();
  const { uiMode, setUiMode } = useUiMode();
  const { record, submitAnswer, resetChapter, stats, cloudReady } = useStudyRecord(
    user?.id ?? null,
  );
  const [tab, setTab] = useState<AppTab>('learn');
  const [view, setView] = useState<View>({ type: 'tabs' });
  const [signOutOpen, setSignOutOpen] = useState(false);

  const requestSignOut = () => setSignOutOpen(true);
  const confirmSignOut = async () => {
    await signOut();
    setSignOutOpen(false);
  };

  const signOutDialog = (
    <ConfirmDialog
      open={signOutOpen}
      title="Sign out?"
      message="Are you sure you want to sign out?"
      confirmLabel="Sign out"
      cancelLabel="Cancel"
      onConfirm={() => void confirmSignOut()}
      onCancel={() => setSignOutOpen(false)}
    />
  );

  if (phase === 'loading' || (user && !cloudReady)) {
    return (
      <>
        <div className="auth-shell">
          <div className="auth-card loading-card">
            <p className="eyebrow">Loading</p>
            <h1>Please wait...</h1>
          </div>
        </div>
        {signOutDialog}
      </>
    );
  }

  if (phase === 'signed_out') {
    return <AuthPage />;
  }

  if (phase === 'device_limit') {
    return (
      <>
        <DeviceLimitPage onRequestSignOut={requestSignOut} />
        {signOutDialog}
      </>
    );
  }

  if (view.type === 'quiz') {
    return (
      <>
        <div className={uiMode === 'premium' ? 'premium-quiz-wrap' : undefined}>
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
        </div>
        {signOutDialog}
      </>
    );
  }

  if (uiMode === 'premium' && user) {
    return (
      <>
        <PremiumShell
          uiMode={uiMode}
          setUiMode={setUiMode}
          user={user}
          record={record}
          stats={stats}
          language={language}
          setLanguage={setLanguage}
          onRequestSignOut={requestSignOut}
          onSelectQuestion={(chapterId, serial) =>
            setView({ type: 'quiz', chapterId, startIndex: serial - 1 })
          }
        />
        {signOutDialog}
      </>
    );
  }

  return (
    <>
      <div className="app-shell">
        {tab !== 'learn' && (
          <div className="classic-floating-toggle">
            <UiModeToggle uiMode={uiMode} onChange={setUiMode} />
          </div>
        )}
        {tab === 'learn' ? (
          <HomePage
            language={language}
            setLanguage={setLanguage}
            record={record}
            stats={stats}
            userEmail={user?.email ?? ''}
            onRequestSignOut={requestSignOut}
            uiMode={uiMode}
            setUiMode={setUiMode}
            onSelectQuestion={(chapterId, serial) =>
              setView({ type: 'quiz', chapterId, startIndex: serial - 1 })
            }
          />
        ) : tab === 'vocab' ? (
          <VocabularyPage
            language={language}
            setLanguage={setLanguage}
            userEmail={user?.email ?? ''}
            onRequestSignOut={requestSignOut}
          />
        ) : (
          <RecordPage
            record={record}
            language={language}
            setLanguage={setLanguage}
            stats={stats}
            userEmail={user?.email ?? ''}
            onRequestSignOut={requestSignOut}
          />
        )}
        <BottomNav activeTab={tab} onChange={setTab} />
      </div>
      {signOutDialog}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
