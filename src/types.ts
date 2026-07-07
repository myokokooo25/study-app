export interface StudyOption {
  id: number;
  textJP: string;
  textMY: string;
}

export interface StudyExplanation {
  titleMY: string;
  reasonMY: string;
  memoryTipMY: string;
}

export interface StudyCardData {
  id: string;
  questionJP: string;
  questionMY: string;
  options: StudyOption[];
  correctOptionId: number;
  explanation: StudyExplanation;
}

export type LanguageMode = 'both' | 'jp' | 'my';

export interface ChapterPart {
  id: string;
  titleJP: string;
  titleMY: string;
  questions: StudyCardData[];
}

export interface Chapter {
  id: number;
  titleJP: string;
  titleMY: string;
  parts: ChapterPart[];
}

export interface QuizProgress {
  answered: Record<string, number | null>;
  score: { correct: number; total: number };
}

export interface QuestionRecord {
  questionId: string;
  partId: string;
  chapterId: number;
  selectedId: number;
  correct: boolean;
  answeredAt: string;
}

export interface DailyRecord {
  date: string;
  questionsAnswered: number;
  correctCount: number;
  xpEarned: number;
}

export interface StudySession {
  id: string;
  partId: string;
  chapterId: number;
  partTitleMY: string;
  startedAt: string;
  lastActiveAt: string;
  correct: number;
  total: number;
}

export interface StudyRecord {
  totalXp: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  daily: Record<string, DailyRecord>;
  questions: Record<string, QuestionRecord>;
  partProgress: Record<string, QuizProgress>;
  sessions: StudySession[];
}

export type AppTab = 'learn' | 'vocab' | 'together' | 'record';

export type UiMode = 'classic' | 'premium';

export interface VocabularyWord {
  id: number;
  category: string;
  kanji: string;
  reading: string;
  english: string;
  burmese: string;
}

export interface VocabProgress {
  learnedIds: number[];
  dayProgress: Record<number, number[]>;
}
