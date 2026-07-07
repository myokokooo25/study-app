import { chapters } from '../data';
import type { LanguageMode, StudyRecord } from '../types';
import { getChapterStats, getRecentDailyRecords } from '../studyRecord';
import { LanguageToggle } from './LanguageToggle';

interface Props {
  record: StudyRecord;
  language: LanguageMode;
  setLanguage: (mode: LanguageMode) => void;
  stats: ReturnType<typeof import('../studyRecord').getOverallStats>;
  userEmail: string;
  onSignOut: () => Promise<void>;
}

export function RecordPage({ record, language, setLanguage, stats, userEmail, onSignOut }: Props) {
  const recentDays = getRecentDailyRecords(record, 7);
  const maxDaily = Math.max(...recentDays.map((day) => day.questionsAnswered), 1);

  return (
    <div className="page record-page">
      <header className="record-hero">
        <div>
          <p className="eyebrow">Study Record</p>
          <h1>လေ့ကျင့်မှတ်တမ်း</h1>
          <button type="button" className="text-link account-link" onClick={() => void onSignOut()}>
            {userEmail} · Sign out
          </button>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      <section className="stat-cards">
        <article className="stat-card xp">
          <span className="stat-icon">⚡</span>
          <strong>{stats.totalXp}</strong>
          <span>Total XP</span>
        </article>
        <article className="stat-card streak">
          <span className="stat-icon">🔥</span>
          <strong>{stats.streak}</strong>
          <span>Streak</span>
        </article>
        <article className="stat-card accuracy">
          <span className="stat-icon">🎯</span>
          <strong>{stats.accuracy}%</strong>
          <span>Accuracy</span>
        </article>
        <article className="stat-card done">
          <span className="stat-icon">✅</span>
          <strong>{stats.answered}</strong>
          <span>Answered</span>
        </article>
      </section>

      <section className="panel">
        <h2>Today</h2>
        <div className="today-grid">
          <div>
            <strong>{stats.todayAnswered}</strong>
            <span>Questions</span>
          </div>
          <div>
            <strong>{stats.todayCorrect}</strong>
            <span>Correct</span>
          </div>
          <div>
            <strong>{stats.todayXp}</strong>
            <span>XP earned</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Last 7 days</h2>
        <div className="chart">
          {recentDays.map((day) => (
            <div key={day.date} className="chart-bar-wrap">
              <div
                className="chart-bar"
                style={{ height: `${(day.questionsAnswered / maxDaily) * 100}%` }}
                title={`${day.date}: ${day.questionsAnswered} questions`}
              />
              <span>{day.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Chapter progress</h2>
        <div className="chapter-progress-list">
          {chapters.map((chapter) => {
            const chapterStats = getChapterStats(record, chapter.id);
            return (
              <article key={chapter.id} className="chapter-progress-item">
                <div className="chapter-progress-top">
                  <strong>
                    Ch.{chapter.id}{' '}
                    {language === 'jp'
                      ? chapter.titleJP
                      : language === 'my'
                        ? chapter.titleMY
                        : chapter.titleMY}
                  </strong>
                  <span>{chapterStats.percent}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${chapterStats.percent}%` }}
                  />
                </div>
                <p>
                  {chapterStats.answered}/{chapterStats.total} answered · {chapterStats.correct} correct
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <h2>Recent sessions</h2>
        {record.sessions.length === 0 ? (
          <p className="empty-state">Session မရှိသေးပါ။ Learn tab မှာ quiz စလိုက်ပါ။</p>
        ) : (
          <div className="session-list">
            {record.sessions.slice(0, 10).map((session) => (
              <article key={session.id} className="session-item">
                <div>
                  <strong>Ch.{session.chapterId} · {session.partTitleMY}</strong>
                  <p>{new Date(session.startedAt).toLocaleString()}</p>
                </div>
                <span className="session-score">
                  {session.correct}/{session.total}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel subtle">
        <p>Longest streak: <strong>{stats.longestStreak} days</strong></p>
        <p>Total correct: <strong>{stats.correct}</strong></p>
      </section>
    </div>
  );
}
