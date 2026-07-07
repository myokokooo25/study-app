import { useMemo, useState } from 'react';
import { vocabularyData } from '../data/vocabulary';
import type { LanguageMode, VocabularyWord } from '../types';
import {
  TOTAL_STUDY_DAYS,
  WORDS_PER_DAY,
  useVocabProgress,
} from '../vocabularyRecord';
import { LanguageToggle } from './LanguageToggle';

type VocabMode = 'cards' | 'list' | 'plan' | 'quiz';

interface Props {
  language: LanguageMode;
  setLanguage: (mode: LanguageMode) => void;
  userEmail: string;
  onSignOut: () => Promise<void>;
  embedded?: boolean;
}

const categories = [...new Set(vocabularyData.map((w) => w.category))];

function getWordsForDay(dayIndex: number) {
  const start = dayIndex * WORDS_PER_DAY;
  return vocabularyData.slice(start, start + WORDS_PER_DAY);
}

function speakReading(text: string) {
  if (!('speechSynthesis' in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function filterWords(search: string, category: string) {
  const query = search.trim().toLowerCase();
  return vocabularyData.filter((word) => {
    if (category !== 'all' && word.category !== category) {
      return false;
    }
    if (!query) {
      return true;
    }
    return (
      word.kanji.toLowerCase().includes(query) ||
      word.reading.toLowerCase().includes(query) ||
      word.english.toLowerCase().includes(query) ||
      word.burmese.toLowerCase().includes(query)
    );
  });
}

type QuizQuestion = {
  word: VocabularyWord;
  options: VocabularyWord[];
  type: 'kanji-to-meaning' | 'meaning-to-kanji';
};

function buildQuiz(learnedWords: VocabularyWord[]): QuizQuestion[] {
  if (learnedWords.length < 4) {
    return [];
  }
  const pool = [...learnedWords].sort(() => Math.random() - 0.5).slice(0, 10);
  return pool.map((word) => {
    const distractors = vocabularyData
      .filter((item) => item.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [...distractors, word].sort(() => Math.random() - 0.5);
    const type: QuizQuestion['type'] =
      Math.random() > 0.5 ? 'kanji-to-meaning' : 'meaning-to-kanji';
    return { word, options, type };
  });
}

export function VocabularyPage({ language, setLanguage, userEmail, onSignOut, embedded = false }: Props) {
  const { progress, learnedSet, toggleLearned, markDayWord, learnedCount } =
    useVocabProgress();
  const [mode, setMode] = useState<VocabMode>('cards');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [dayCardIndex, setDayCardIndex] = useState(0);
  const [dayFlipped, setDayFlipped] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const filteredWords = useMemo(
    () => filterWords(search, category),
    [search, category],
  );

  const learnedWords = useMemo(
    () => vocabularyData.filter((word) => learnedSet.has(word.id)),
    [learnedSet],
  );

  const currentWord = filteredWords[cardIndex];
  const dayWords = activeDay !== null ? getWordsForDay(activeDay) : [];
  const dayWord = dayWords[dayCardIndex];
  const currentQuiz = quizQuestions[quizIndex];

  const startQuiz = () => {
    setQuizQuestions(buildQuiz(learnedWords));
    setQuizIndex(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizDone(false);
    setMode('quiz');
  };

  const handleQuizAnswer = (optionId: number) => {
    if (quizSelected !== null || !currentQuiz) {
      return;
    }
    setQuizSelected(optionId);
    if (optionId === currentQuiz.word.id) {
      setQuizScore((score) => score + 1);
    }
  };

  const handleQuizNext = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((index) => index + 1);
      setQuizSelected(null);
      return;
    }
    setQuizDone(true);
  };

  return (
    <div className={`page vocab-page ${embedded ? 'vocab-embedded' : ''}`}>
      {!embedded && (
        <header className="duo-topbar home-topbar">
          <div className="account-chip">{userEmail}</div>
          <div className="duo-stat-pill xp-pill">
            <span>📚</span>
            <strong>
              {learnedCount}/{vocabularyData.length}
            </strong>
          </div>
          <button type="button" className="text-link sign-out-link" onClick={() => void onSignOut()}>
            Sign out
          </button>
        </header>
      )}

      {!embedded && (
        <section className="home-banner">
          <div>
            <p className="eyebrow">Vocabulary</p>
            <h1>単語 Flashcards</h1>
            <p className="subtitle">သံမဏိတည်ဆောက်ရေး စကားလုံး {vocabularyData.length} ခု</p>
          </div>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </section>
      )}

      <nav className="vocab-mode-tabs" aria-label="Vocabulary modes">
        {(
          [
            ['cards', 'Cards'],
            ['list', 'List'],
            ['plan', '40 Days'],
            ['quiz', 'Quiz'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={mode === key ? 'active' : ''}
            onClick={() => {
              setMode(key);
              if (key === 'quiz' && quizQuestions.length === 0) {
                startQuiz();
              }
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="vocab-toolbar">
        <input
          type="search"
          placeholder="Search kanji, reading, meaning..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCardIndex(0);
            setFlipped(false);
          }}
        />
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setCardIndex(0);
            setFlipped(false);
          }}
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {mode === 'cards' && (
        <section className="vocab-cards-section">
          {!currentWord ? (
            <p className="vocab-empty">No words match your search.</p>
          ) : (
            <>
              <div
                className={`vocab-flashcard ${flipped ? 'flipped' : ''}`}
                onClick={() => setFlipped((value) => !value)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setFlipped((value) => !value);
                  }
                }}
              >
                <div className="vocab-flashcard-inner">
                  <div className="vocab-flashcard-face front">
                    <button
                      type="button"
                      className={`vocab-learned-btn ${learnedSet.has(currentWord.id) ? 'active' : ''}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLearned(currentWord.id);
                      }}
                      aria-label="Toggle learned"
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      className="vocab-speak-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        speakReading(currentWord.reading);
                      }}
                      aria-label="Play pronunciation"
                    >
                      🔊
                    </button>
                    <p className="vocab-category">{currentWord.category}</p>
                    <h2 className="vocab-kanji">{currentWord.kanji}</h2>
                    <p className="vocab-hint">Tap to flip</p>
                  </div>
                  <div className="vocab-flashcard-face back">
                    <p className="vocab-label">Reading</p>
                    <p className="vocab-reading">{currentWord.reading}</p>
                    {(language === 'both' || language === 'jp') && (
                      <>
                        <p className="vocab-label">English</p>
                        <p>{currentWord.english}</p>
                      </>
                    )}
                    {(language === 'both' || language === 'my') && (
                      <>
                        <p className="vocab-label">Burmese</p>
                        <p>{currentWord.burmese}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="vocab-card-nav">
                <button
                  type="button"
                  className="duo-btn secondary"
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setCardIndex((index) => Math.max(0, index - 1));
                    setFlipped(false);
                  }}
                >
                  ← Prev
                </button>
                <span>
                  {cardIndex + 1} / {filteredWords.length}
                </span>
                <button
                  type="button"
                  className="duo-btn secondary"
                  disabled={cardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    setCardIndex((index) =>
                      Math.min(filteredWords.length - 1, index + 1),
                    );
                    setFlipped(false);
                  }}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {mode === 'list' && (
        <section className="vocab-list-section">
          {filteredWords.length === 0 ? (
            <p className="vocab-empty">No words match your search.</p>
          ) : (
            <div className="vocab-list">
              {filteredWords.map((word) => (
                <article key={word.id} className="vocab-list-row">
                  <button
                    type="button"
                    className={`vocab-learned-btn small ${learnedSet.has(word.id) ? 'active' : ''}`}
                    onClick={() => toggleLearned(word.id)}
                    aria-label="Toggle learned"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    className="vocab-speak-btn small"
                    onClick={() => speakReading(word.reading)}
                    aria-label="Play pronunciation"
                  >
                    🔊
                  </button>
                  <strong>{word.kanji}</strong>
                  <span>{word.reading}</span>
                  <span>{word.english}</span>
                  <span>{word.burmese}</span>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {mode === 'plan' && activeDay === null && (
        <section className="vocab-plan-section">
          <h2>40 Days Study Plan</h2>
          <p className="subtitle">{WORDS_PER_DAY} words per day · {vocabularyData.length} total</p>
          <div className="vocab-plan-grid">
            {Array.from({ length: TOTAL_STUDY_DAYS }).map((_, dayIndex) => {
              const learnedToday = progress.dayProgress[dayIndex]?.length ?? 0;
              const done = learnedToday >= Math.min(WORDS_PER_DAY, getWordsForDay(dayIndex).length);
              return (
                <button
                  key={dayIndex}
                  type="button"
                  className={`vocab-day-btn ${done ? 'done' : ''}`}
                  onClick={() => {
                    setActiveDay(dayIndex);
                    setDayCardIndex(0);
                    setDayFlipped(false);
                  }}
                >
                  <span className="vocab-day-label">Day</span>
                  <strong>{dayIndex + 1}</strong>
                  <span className="vocab-day-progress">
                    {learnedToday}/{getWordsForDay(dayIndex).length}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {mode === 'plan' && activeDay !== null && (
        <section className="vocab-cards-section">
          <button
            type="button"
            className="text-link vocab-back-link"
            onClick={() => setActiveDay(null)}
          >
            ← Back to plan
          </button>
          <h2>Day {activeDay + 1}</h2>
          {!dayWord ? (
            <p className="vocab-empty">No words for this day.</p>
          ) : (
            <>
              <div
                className={`vocab-flashcard ${dayFlipped ? 'flipped' : ''}`}
                onClick={() => setDayFlipped((value) => !value)}
              >
                <div className="vocab-flashcard-inner">
                  <div className="vocab-flashcard-face front">
                    <p className="vocab-category">{dayWord.category}</p>
                    <h2 className="vocab-kanji">{dayWord.kanji}</h2>
                    <p className="vocab-hint">Tap to flip</p>
                  </div>
                  <div className="vocab-flashcard-face back">
                    <p className="vocab-label">Reading</p>
                    <p className="vocab-reading">{dayWord.reading}</p>
                    <p className="vocab-label">English</p>
                    <p>{dayWord.english}</p>
                    <p className="vocab-label">Burmese</p>
                    <p>{dayWord.burmese}</p>
                  </div>
                </div>
              </div>
              <div className="vocab-card-nav">
                <button
                  type="button"
                  className="duo-btn secondary"
                  disabled={dayCardIndex === 0}
                  onClick={() => {
                    setDayCardIndex((index) => Math.max(0, index - 1));
                    setDayFlipped(false);
                  }}
                >
                  ← Prev
                </button>
                <span>
                  {dayCardIndex + 1} / {dayWords.length}
                </span>
                <button
                  type="button"
                  className="duo-btn primary"
                  onClick={() => {
                    markDayWord(activeDay, dayWord.id);
                    if (dayCardIndex < dayWords.length - 1) {
                      setDayCardIndex((index) => index + 1);
                      setDayFlipped(false);
                    }
                  }}
                >
                  {dayCardIndex < dayWords.length - 1 ? 'Learned →' : 'Done ✓'}
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {mode === 'quiz' && learnedWords.length < 4 && (
        <section className="vocab-quiz-section">
          <p className="vocab-empty">
            Quiz အတွက် အနည်းဆုံး 4 စကားလုံး learned လုပ်ထားပါ။ Cards mode မှာ ✓ နှိပ်ပါ။
          </p>
          <button type="button" className="duo-btn primary" onClick={() => setMode('cards')}>
            Go to Cards
          </button>
        </section>
      )}

      {mode === 'quiz' && learnedWords.length >= 4 && quizDone && (
        <section className="vocab-quiz-section">
          <h2>Quiz Finished!</h2>
          <p className="vocab-quiz-score">
            {quizScore} / {quizQuestions.length} correct
          </p>
          <div className="vocab-card-nav">
            <button type="button" className="duo-btn primary" onClick={startQuiz}>
              Try Again
            </button>
            <button type="button" className="duo-btn secondary" onClick={() => setMode('cards')}>
              Back to Cards
            </button>
          </div>
        </section>
      )}

      {mode === 'quiz' &&
        learnedWords.length >= 4 &&
        !quizDone &&
        currentQuiz &&
        quizQuestions.length > 0 && (
          <section className="vocab-quiz-section">
            <p className="vocab-quiz-progress">
              Question {quizIndex + 1} / {quizQuestions.length}
            </p>
            <h2 className="vocab-quiz-prompt">
              {currentQuiz.type === 'kanji-to-meaning'
                ? currentQuiz.word.kanji
                : `${currentQuiz.word.english} / ${currentQuiz.word.burmese}`}
            </h2>
            <p className="subtitle">
              {currentQuiz.type === 'kanji-to-meaning'
                ? 'Choose the correct meaning'
                : 'Choose the correct kanji'}
            </p>
            <div className="vocab-quiz-options">
              {currentQuiz.options.map((option) => {
                const selected = quizSelected === option.id;
                const correct = option.id === currentQuiz.word.id;
                let stateClass = '';
                if (quizSelected !== null) {
                  if (correct) {
                    stateClass = 'correct';
                  } else if (selected) {
                    stateClass = 'wrong';
                  } else {
                    stateClass = 'dimmed';
                  }
                }
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`vocab-quiz-option ${stateClass}`}
                    disabled={quizSelected !== null}
                    onClick={() => handleQuizAnswer(option.id)}
                  >
                    {currentQuiz.type === 'kanji-to-meaning'
                      ? `${option.english} / ${option.burmese}`
                      : `${option.kanji} (${option.reading})`}
                  </button>
                );
              })}
            </div>
            {quizSelected !== null && (
              <button type="button" className="duo-btn primary vocab-quiz-next" onClick={handleQuizNext}>
                {quizIndex < quizQuestions.length - 1 ? 'CONTINUE' : 'SEE RESULTS'}
              </button>
            )}
          </section>
        )}
    </div>
  );
}
