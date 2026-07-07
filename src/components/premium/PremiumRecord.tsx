import { chapters } from '../../data';
import type { StudyRecord } from '../../types';
import { getChapterStats, getRecentDailyRecords } from '../../studyRecord';

interface Props {
  record: StudyRecord;
  stats: {
    totalXp: number;
    streak: number;
    longestStreak: number;
    todayAnswered: number;
    todayCorrect: number;
    accuracy: number;
    answered: number;
  };
}

export function PremiumRecord({ record, stats }: Props) {
  const recentDays = getRecentDailyRecords(record, 7);
  const maxDaily = Math.max(...recentDays.map((day) => day.questionsAnswered), 1);

  return (
    <div className="premium-panel">
      <section className="premium-hero-card compact">
        <p className="premium-kicker">Performance</p>
        <h2>Study Record</h2>
      </section>

      <section className="premium-stat-row">
        <article>
          <strong>{stats.totalXp}</strong>
          <span>Total XP</span>
        </article>
        <article>
          <strong>{stats.streak}</strong>
          <span>Streak</span>
        </article>
        <article>
          <strong>{stats.longestStreak}</strong>
          <span>Best</span>
        </article>
        <article>
          <strong>{stats.accuracy}%</strong>
          <span>Accuracy</span>
        </article>
      </section>

      <section className="premium-section">
        <h3>Today</h3>
        <div className="premium-today-card">
          <div>
            <strong>{stats.todayAnswered}</strong>
            <span>Questions</span>
          </div>
          <div>
            <strong>{stats.todayCorrect}</strong>
            <span>Correct</span>
          </div>
          <div>
            <strong>{stats.answered}</strong>
            <span>Total done</span>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <h3>Last 7 days</h3>
        <div className="premium-chart">
          {recentDays.map((day) => (
            <div key={day.date} className="premium-chart-bar-wrap">
              <div
                className="premium-chart-bar"
                style={{ height: `${(day.questionsAnswered / maxDaily) * 100}%` }}
                title={`${day.date}: ${day.questionsAnswered}`}
              />
              <span>{day.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-section">
        <h3>Chapter progress</h3>
        <div className="premium-progress-list">
          {chapters.map((chapter) => {
            const chapterStats = getChapterStats(record, chapter.id);
            return (
              <article key={chapter.id} className="premium-progress-item">
                <div className="premium-progress-head">
                  <strong>
                    Ch{chapter.id}. {chapter.titleJP}
                  </strong>
                  <span>{chapterStats.percent}%</span>
                </div>
                <div className="premium-progress-track">
                  <div style={{ width: `${chapterStats.percent}%` }} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
