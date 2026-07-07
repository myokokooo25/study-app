import { chapters, getChapterQuestions, totalQuestionCount } from '../../data';
import type { StudyRecord } from '../../types';
import { getChapterStats } from '../../studyRecord';

interface Props {
  record: StudyRecord;
  stats: {
    totalXp: number;
    streak: number;
    todayAnswered: number;
    accuracy: number;
    answered: number;
  };
  onSelectChapter: (chapterId: number) => void;
  onSelectQuestion: (chapterId: number, serial: number) => void;
}

export function PremiumDashboard({
  record,
  stats,
  onSelectChapter,
  onSelectQuestion,
}: Props) {
  const nextChapter =
    chapters.find((chapter) => {
      const chapterStats = getChapterStats(record, chapter.id);
      return chapterStats.percent < 100;
    }) ?? chapters[0];

  const nextQuestion = nextChapter
    ? getChapterQuestions(nextChapter.id).find(
        ({ question }) => !record.questions[question.id],
      )
    : null;

  return (
    <div className="premium-panel">
      <section className="premium-hero-card">
        <p className="premium-kicker">鉄骨製作管理技術者試験</p>
        <h2>Study Hub</h2>
        <p className="premium-muted">
          {totalQuestionCount} questions · {chapters.length} chapters
        </p>
        {nextQuestion && (
          <button
            type="button"
            className="premium-cta"
            onClick={() =>
              onSelectQuestion(nextChapter.id, nextQuestion.serial)
            }
          >
            Continue · Q{nextQuestion.serial}
            <span>→</span>
          </button>
        )}
      </section>

      <section className="premium-stat-row">
        <article>
          <strong>{stats.streak}</strong>
          <span>Streak</span>
        </article>
        <article>
          <strong>{stats.totalXp}</strong>
          <span>XP</span>
        </article>
        <article>
          <strong>{stats.accuracy}%</strong>
          <span>Accuracy</span>
        </article>
        <article>
          <strong>{stats.todayAnswered}</strong>
          <span>Today</span>
        </article>
      </section>

      <section className="premium-section">
        <h3>Chapters</h3>
        <div className="premium-chapter-grid">
          {chapters.map((chapter) => {
            const chapterStats = getChapterStats(record, chapter.id);
            return (
              <button
                key={chapter.id}
                type="button"
                className="premium-chapter-card"
                onClick={() => onSelectChapter(chapter.id)}
              >
                <span className="premium-chapter-no">Chapter{chapter.id}</span>
                <strong>{chapter.titleJP}</strong>
                <span className="premium-chapter-meta">
                  {chapterStats.percent}% · {chapterStats.answered}/{chapterStats.total}
                </span>
                <div className="premium-mini-track">
                  <div style={{ width: `${chapterStats.percent}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
