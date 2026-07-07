import { chapters, getChapterQuestions } from '../../data';
import type { StudyRecord } from '../../types';
import { getChapterStats } from '../../studyRecord';

interface Props {
  record: StudyRecord;
  activeChapterId: number;
  onChapterChange: (chapterId: number) => void;
  onSelectQuestion: (chapterId: number, serial: number) => void;
}

const chapterColors = ['#e8c547', '#6ecbff', '#b794ff', '#ff9f5a', '#ff6b8a'];

export function PremiumLearn({
  record,
  activeChapterId,
  onChapterChange,
  onSelectQuestion,
}: Props) {
  const activeChapter =
    chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0];
  const activeIndex = chapters.findIndex((chapter) => chapter.id === activeChapterId);
  const color = chapterColors[activeIndex >= 0 ? activeIndex : 0];
  const chapterStats = getChapterStats(record, activeChapter.id);
  const chapterQuestions = getChapterQuestions(activeChapter.id);

  return (
    <div className="premium-panel">
      <section className="premium-learn-header">
        <h2>問題集</h2>
        <p className="premium-muted">
          Chapter{activeChapter.id}. {activeChapter.titleJP}
        </p>
      </section>

      <div className="premium-chapter-rail">
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === activeChapterId;
          return (
            <button
              key={chapter.id}
              type="button"
              className={`premium-chapter-pill ${isActive ? 'active' : ''}`}
              style={{ ['--pill-color' as string]: chapterColors[index] }}
              onClick={() => onChapterChange(chapter.id)}
            >
              {chapter.id}
            </button>
          );
        })}
      </div>

      <section
        className="premium-question-panel"
        style={{ ['--chapter-color' as string]: color }}
      >
        <div className="premium-question-meta">
          <span>
            {chapterStats.answered}/{chapterStats.total} answered
          </span>
          <span>{chapterStats.percent}%</span>
        </div>
        <div className="premium-progress-track">
          <div style={{ width: `${chapterStats.percent}%` }} />
        </div>
        <div className="premium-question-grid">
          {chapterQuestions.map(({ serial, question }) => {
            const questionRecord = record.questions[question.id];
            const answered = Boolean(questionRecord);
            const correct = questionRecord?.correct ?? false;

            return (
              <button
                key={question.id}
                type="button"
                className={[
                  'premium-q-btn',
                  answered ? (correct ? 'correct' : 'wrong') : 'new',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onSelectQuestion(activeChapter.id, serial)}
              >
                {answered ? (correct ? '✓' : serial) : serial}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
