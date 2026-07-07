import { useMemo, useState } from 'react';
import { getChapterById, getChapterQuestions } from '../data';
import type { LanguageMode, StudyRecord } from '../types';
import { TextBlock } from './LanguageToggle';

interface Props {
  chapterId: number;
  startIndex: number;
  language: LanguageMode;
  record: StudyRecord;
  stats: { streak: number; totalXp: number };
  onSubmitAnswer: (input: {
    questionId: string;
    partId: string;
    chapterId: number;
    partTitleMY: string;
    selectedId: number;
    isCorrect: boolean;
  }) => void;
  onResetChapter: (chapterId: number) => void;
  onBack: () => void;
}

export function QuizPage({
  chapterId,
  startIndex,
  language,
  record,
  stats,
  onSubmitAnswer,
  onResetChapter,
  onBack,
}: Props) {
  const chapter = useMemo(() => getChapterById(chapterId), [chapterId]);
  const chapterQuestions = useMemo(
    () => getChapterQuestions(chapterId),
    [chapterId],
  );
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  if (!chapter || chapterQuestions.length === 0) {
    return (
      <div className="page">
        <p>Chapter not found.</p>
        <button type="button" className="duo-btn secondary" onClick={onBack}>Back</button>
      </div>
    );
  }

  const current = chapterQuestions[currentIndex];
  const question = current.question;
  const questionRecord = record.questions[question.id];
  const isAnswered = Boolean(questionRecord);
  const savedAnswer = questionRecord?.selectedId ?? null;
  const activeSelection = selectedId ?? savedAnswer ?? null;
  const isCorrect = activeSelection === question.correctOptionId;
  const progressPercent = Math.round(((currentIndex + 1) / chapterQuestions.length) * 100);
  const serialNumber = current.serial;

  const syncQuestionState = (index: number) => {
    const target = chapterQuestions[index];
    const answered = record.questions[target.question.id];
    setCurrentIndex(index);
    setSelectedId(answered?.selectedId ?? null);
    setChecked(Boolean(answered));
    setCelebrate(false);
  };

  const handleCheck = () => {
    if (activeSelection === null || checked || isAnswered) {
      return;
    }

    const correct = activeSelection === question.correctOptionId;
    setChecked(true);
    setCelebrate(correct);
    onSubmitAnswer({
      questionId: question.id,
      partId: current.partId,
      chapterId: chapter.id,
      partTitleMY: chapter.titleMY,
      selectedId: activeSelection,
      isCorrect: correct,
    });
  };

  const handleContinue = () => {
    if (currentIndex < chapterQuestions.length - 1) {
      syncQuestionState(currentIndex + 1);
      return;
    }

    onBack();
  };

  const handleReset = () => {
    if (window.confirm('Chapter progress reset လုပ်မလား?')) {
      onResetChapter(chapterId);
      setCurrentIndex(0);
      setSelectedId(null);
      setChecked(false);
      setCelebrate(false);
    }
  };

  return (
    <div className={`quiz-shell ${checked ? (isCorrect ? 'state-correct' : 'state-wrong') : ''}`}>
      <header className="quiz-topbar">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="Close">
          ✕
        </button>
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="quiz-top-stats">
          <span className="mini-pill">🔥 {stats.streak}</span>
          <span className="mini-pill">⚡ {stats.totalXp}</span>
        </div>
      </header>

      <main className="quiz-main">
        <p className="quiz-serial">
          No. {serialNumber} / {chapterQuestions.length}
        </p>
        <p className="quiz-prompt">最も不適当なものはどれか</p>

        <TextBlock
          language={language}
          jp={question.questionJP}
          my={question.questionMY}
          className="quiz-question"
        />

        <div className="options-list">
          {question.options.map((option) => {
            let state = '';
            if (checked || isAnswered) {
              if (option.id === question.correctOptionId) {
                state = 'correct';
              } else if (option.id === activeSelection) {
                state = 'wrong';
              }
            } else if (option.id === activeSelection) {
              state = 'selected';
            }

            return (
              <button
                key={option.id}
                type="button"
                className={`option-card ${state}`.trim()}
                onClick={() => {
                  if (checked || isAnswered) {
                    return;
                  }
                  setSelectedId(option.id);
                }}
                disabled={checked || isAnswered}
              >
                <span className="option-number">{option.id}</span>
                <TextBlock
                  language={language}
                  jp={option.textJP}
                  my={option.textMY}
                />
              </button>
            );
          })}
        </div>

        {(checked || isAnswered) && (
          <section className={`feedback-panel ${isCorrect ? 'correct' : 'wrong'} ${celebrate ? 'celebrate' : ''}`}>
            <div className="feedback-header">
              <strong>{isCorrect ? '🎉 Excellent!' : '😅 Incorrect'}</strong>
              <span>Answer: ({question.correctOptionId})</span>
            </div>
            <h3>{question.explanation.titleMY}</h3>
            <p>{question.explanation.reasonMY}</p>
            <p className="memory-tip">
              <strong>Memory tip:</strong> {question.explanation.memoryTipMY}
            </p>
          </section>
        )}

        <div className="question-grid quiz-question-grid">
          {chapterQuestions.map((item, index) => {
            const answered = record.questions[item.question.id];
            const correct = answered?.correct ?? false;
            return (
              <button
                key={item.question.id}
                type="button"
                className={[
                  'question-number-btn',
                  'small',
                  index === currentIndex ? 'active' : '',
                  answered ? (correct ? 'correct' : 'wrong') : 'new',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => syncQuestionState(index)}
                aria-label={`Question ${item.serial}`}
              >
                {answered && correct ? '✓' : item.serial}
              </button>
            );
          })}
        </div>

        <button type="button" className="text-link" onClick={handleReset}>
          Reset chapter
        </button>
      </main>

      <footer className="quiz-action-bar">
        {!checked && !isAnswered ? (
          <button
            type="button"
            className="duo-btn primary"
            disabled={activeSelection === null}
            onClick={handleCheck}
          >
            CHECK
          </button>
        ) : (
          <button type="button" className="duo-btn primary" onClick={handleContinue}>
            {currentIndex < chapterQuestions.length - 1 ? 'CONTINUE' : 'FINISH'}
          </button>
        )}
      </footer>
    </div>
  );
}
