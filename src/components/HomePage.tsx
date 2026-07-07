import { useState } from 'react';
import { chapters, getChapterQuestions, totalQuestionCount } from '../data';
import type { LanguageMode, StudyRecord } from '../types';
import { getChapterStats } from '../studyRecord';
import { LanguageToggle } from './LanguageToggle';
import { UiModeToggle } from './UiModeToggle';
import type { UiMode } from '../types';

interface Props {
  language: LanguageMode;
  setLanguage: (mode: LanguageMode) => void;
  record: StudyRecord;
  stats: {
    totalXp: number;
    streak: number;
    todayAnswered: number;
  };
  userEmail: string;
  onSignOut: () => Promise<void>;
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  onSelectQuestion: (chapterId: number, serial: number) => void;
}

const chapterColors = ['#58CC02', '#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B'];

export function HomePage({
  language,
  setLanguage,
  record,
  stats,
  userEmail,
  onSignOut,
  uiMode,
  setUiMode,
  onSelectQuestion,
}: Props) {
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? 1);
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0];
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapterId);
  const color = chapterColors[activeIndex >= 0 ? activeIndex % chapterColors.length : 0];
  const chapterStats = getChapterStats(record, activeChapter.id);
  const chapterQuestions = getChapterQuestions(activeChapter.id);

  return (
    <div className="page home-page">
      <header className="duo-topbar home-topbar">
        <div className="account-chip">{userEmail}</div>
        <div className="home-topbar-stats">
        <div className="duo-stat-pill streak-pill">
          <span>🔥</span>
          <strong>{stats.streak}</strong>
        </div>
        <div className="duo-stat-pill xp-pill">
          <span>⚡</span>
          <strong>{stats.totalXp}</strong>
        </div>
        <div className="duo-stat-pill today-pill">
          <span>📝</span>
          <strong>{stats.todayAnswered}</strong>
        </div>
        </div>
        <button type="button" className="text-link sign-out-link" onClick={() => void onSignOut()}>
          Sign out
        </button>
      </header>

      <section className="home-banner">
        <div>
          <h1>鉄骨製作管理技術者試験</h1>
        </div>
        <div className="home-banner-actions">
          <UiModeToggle uiMode={uiMode} onChange={setUiMode} />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
      </section>

      <nav className="chapter-toc" aria-label="Chapters">
        {chapters.map((chapter, chapterIndex) => {
          const statsForTab = getChapterStats(record, chapter.id);
          const tabColor = chapterColors[chapterIndex % chapterColors.length];
          const isActive = chapter.id === activeChapterId;

          return (
            <button
              key={chapter.id}
              type="button"
              className={`chapter-toc-item ${isActive ? 'active' : ''}`}
              style={{ ['--tab-color' as string]: tabColor }}
              onClick={() => setActiveChapterId(chapter.id)}
            >
              <span className="chapter-toc-title">
                Chapter{chapter.id}. {chapter.titleJP}
              </span>
              {statsForTab.answered > 0 && (
                <span className="chapter-toc-progress">{statsForTab.percent}%</span>
              )}
            </button>
          );
        })}
      </nav>

      <main className="chapter-panel" style={{ ['--chapter-color' as string]: color }}>
        <div className="chapter-panel-header">
          <span className="chapter-badge" style={{ background: color }}>
            Chapter{activeChapter.id}. {activeChapter.titleJP}
          </span>
          <div className="chapter-panel-meta">
            <span>{chapterStats.answered}/{chapterStats.total} answered</span>
            <span>{chapterStats.percent}% complete</span>
          </div>
          <div className="progress-track chapter-panel-track">
            <div
              className="progress-fill"
              style={{ width: `${chapterStats.percent}%`, background: color }}
            />
          </div>
        </div>

        <div className="question-grid">
          {chapterQuestions.map(({ serial, question }) => {
            const questionRecord = record.questions[question.id];
            const answered = Boolean(questionRecord);
            const correct = questionRecord?.correct ?? false;

            return (
              <button
                key={question.id}
                type="button"
                className={[
                  'question-number-btn',
                  answered ? (correct ? 'correct' : 'wrong') : 'new',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ ['--part-color' as string]: color }}
                onClick={() => onSelectQuestion(activeChapter.id, serial)}
              >
                {answered ? (correct ? '✓' : serial) : serial}
              </button>
            );
          })}
        </div>
      </main>

      <footer className="home-footer">
        <span>{chapters.length} chapters</span>
        <span>{totalQuestionCount} questions</span>
      </footer>
    </div>
  );
}
