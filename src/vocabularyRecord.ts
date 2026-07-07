import { useCallback, useEffect, useState } from 'react';
import type { VocabProgress } from './types';

const STORAGE_KEY = 'study-app-vocab';

export const WORDS_PER_DAY = 10;
export const TOTAL_STUDY_DAYS = 40;

export function emptyVocabProgress(): VocabProgress {
  return { learnedIds: [], dayProgress: {} };
}

function loadProgress(): VocabProgress {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return emptyVocabProgress();
  }
  try {
    return { ...emptyVocabProgress(), ...(JSON.parse(saved) as VocabProgress) };
  } catch {
    return emptyVocabProgress();
  }
}

function saveProgress(progress: VocabProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useVocabProgress() {
  const [progress, setProgress] = useState<VocabProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleLearned = useCallback((id: number) => {
    setProgress((current) => {
      const learned = new Set(current.learnedIds);
      if (learned.has(id)) {
        learned.delete(id);
      } else {
        learned.add(id);
      }
      return { ...current, learnedIds: [...learned] };
    });
  }, []);

  const markDayWord = useCallback((dayIndex: number, wordId: number) => {
    setProgress((current) => {
      const dayIds = new Set(current.dayProgress[dayIndex] ?? []);
      dayIds.add(wordId);
      const learned = new Set(current.learnedIds);
      learned.add(wordId);
      return {
        learnedIds: [...learned],
        dayProgress: { ...current.dayProgress, [dayIndex]: [...dayIds] },
      };
    });
  }, []);

  const learnedSet = new Set(progress.learnedIds);

  return {
    progress,
    learnedSet,
    toggleLearned,
    markDayWord,
    learnedCount: progress.learnedIds.length,
  };
}
