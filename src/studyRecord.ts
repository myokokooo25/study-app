import { useEffect, useState } from 'react';
import { chapters } from './data';
import type { QuizProgress, StudyRecord } from './types';

const STORAGE_KEY = 'study-app-record';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function emptyRecord(): StudyRecord {
  return {
    totalXp: 0,
    streak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    daily: {},
    questions: {},
    partProgress: {},
    sessions: [],
  };
}

function loadRecord(): StudyRecord {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return emptyRecord();
  }

  try {
    return { ...emptyRecord(), ...(JSON.parse(saved) as StudyRecord) };
  } catch {
    return emptyRecord();
  }
}

function saveRecord(record: StudyRecord) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function ensureDaily(record: StudyRecord, date: string) {
  if (!record.daily[date]) {
    record.daily[date] = {
      date,
      questionsAnswered: 0,
      correctCount: 0,
      xpEarned: 0,
    };
  }
}

function updateStreak(record: StudyRecord, date: string) {
  if (record.lastStudyDate === date) {
    return;
  }

  if (record.lastStudyDate === yesterdayKey()) {
    record.streak += 1;
  } else if (record.lastStudyDate !== date) {
    record.streak = 1;
  }

  record.longestStreak = Math.max(record.longestStreak, record.streak);
  record.lastStudyDate = date;
}

export function getPartProgressFromRecord(record: StudyRecord, partId: string): QuizProgress {
  return record.partProgress[partId] ?? { answered: {}, score: { correct: 0, total: 0 } };
}

export function recordStudyAnswer(
  record: StudyRecord,
  input: {
    questionId: string;
    partId: string;
    chapterId: number;
    partTitleMY: string;
    selectedId: number;
    isCorrect: boolean;
  },
): StudyRecord {
  const next = structuredClone(record);
  const date = todayKey();
  const alreadyAnswered = input.questionId in next.questions;

  ensureDaily(next, date);
  updateStreak(next, date);

  const partProgress = getPartProgressFromRecord(next, input.partId);
  partProgress.answered[input.questionId] = input.selectedId;

  if (!alreadyAnswered) {
    partProgress.score.total += 1;
    if (input.isCorrect) {
      partProgress.score.correct += 1;
    }

    next.daily[date].questionsAnswered += 1;
    if (input.isCorrect) {
      next.daily[date].correctCount += 1;
    }

    const xp = input.isCorrect ? 10 : 5;
    next.daily[date].xpEarned += xp;
    next.totalXp += xp;
  }

  next.partProgress[input.partId] = partProgress;
  next.questions[input.questionId] = {
    questionId: input.questionId,
    partId: input.partId,
    chapterId: input.chapterId,
    selectedId: input.selectedId,
    correct: input.isCorrect,
    answeredAt: new Date().toISOString(),
  };

  const today = todayKey();
  const activeSession = next.sessions.find(
    (session) =>
      session.partId === input.partId && session.startedAt.slice(0, 10) === today,
  );

  if (activeSession) {
    activeSession.lastActiveAt = new Date().toISOString();
    if (!alreadyAnswered) {
      activeSession.total += 1;
      if (input.isCorrect) {
        activeSession.correct += 1;
      }
    }
  } else {
    next.sessions.unshift({
      id: `${input.partId}-${Date.now()}`,
      partId: input.partId,
      chapterId: input.chapterId,
      partTitleMY: input.partTitleMY,
      startedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      correct: input.isCorrect && !alreadyAnswered ? 1 : 0,
      total: alreadyAnswered ? 0 : 1,
    });
  }

  next.sessions = next.sessions.slice(0, 30);
  return next;
}

export function resetPartProgress(record: StudyRecord, partId: string): StudyRecord {
  const next = structuredClone(record);
  delete next.partProgress[partId];

  for (const [questionId, questionRecord] of Object.entries(next.questions)) {
    if (questionRecord.partId === partId) {
      delete next.questions[questionId];
    }
  }

  next.sessions = next.sessions.filter((session) => session.partId !== partId);
  return next;
}

export function resetChapterProgress(record: StudyRecord, chapterId: number): StudyRecord {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) {
    return record;
  }

  return chapter.parts.reduce(
    (current, part) => resetPartProgress(current, part.id),
    record,
  );
}

export function getOverallStats(record: StudyRecord) {
  const answered = Object.keys(record.questions).length;
  const correct = Object.values(record.questions).filter((item) => item.correct).length;
  const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
  const today = record.daily[todayKey()];

  return {
    answered,
    correct,
    accuracy,
    totalXp: record.totalXp,
    streak: record.streak,
    longestStreak: record.longestStreak,
    todayAnswered: today?.questionsAnswered ?? 0,
    todayCorrect: today?.correctCount ?? 0,
    todayXp: today?.xpEarned ?? 0,
  };
}

export function getChapterStats(record: StudyRecord, chapterId: number) {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) {
    return { total: 0, answered: 0, correct: 0, percent: 0 };
  }

  const questionIds = chapter.parts.flatMap((part) => part.questions.map((q) => q.id));
  const answeredRecords = questionIds
    .map((id) => record.questions[id])
    .filter(Boolean);
  const correct = answeredRecords.filter((item) => item.correct).length;

  return {
    total: questionIds.length,
    answered: answeredRecords.length,
    correct,
    percent: questionIds.length
      ? Math.round((answeredRecords.length / questionIds.length) * 100)
      : 0,
  };
}

export function getRecentDailyRecords(record: StudyRecord, days = 7) {
  const results = [];
  const cursor = new Date();

  for (let index = 0; index < days; index += 1) {
    const key = cursor.toISOString().slice(0, 10);
    results.unshift(record.daily[key] ?? {
      date: key,
      questionsAnswered: 0,
      correctCount: 0,
      xpEarned: 0,
    });
    cursor.setDate(cursor.getDate() - 1);
  }

  return results;
}

export function mergeStudyRecords(base: StudyRecord, incoming: Partial<StudyRecord>): StudyRecord {
  const next = structuredClone(base);

  for (const [questionId, questionRecord] of Object.entries(incoming.questions ?? {})) {
    const existing = next.questions[questionId];
    if (
      !existing ||
      new Date(questionRecord.answeredAt).getTime() >= new Date(existing.answeredAt).getTime()
    ) {
      next.questions[questionId] = questionRecord;
    }
  }

  for (const [partId, progress] of Object.entries(incoming.partProgress ?? {})) {
    next.partProgress[partId] = progress;
  }

  for (const [date, dailyRecord] of Object.entries(incoming.daily ?? {})) {
    const existing = next.daily[date];
    if (!existing || dailyRecord.questionsAnswered >= existing.questionsAnswered) {
      next.daily[date] = dailyRecord;
    }
  }

  next.totalXp = Math.max(next.totalXp, incoming.totalXp ?? 0);
  next.streak = Math.max(next.streak, incoming.streak ?? 0);
  next.longestStreak = Math.max(next.longestStreak, incoming.longestStreak ?? 0);

  if (incoming.lastStudyDate) {
    if (!next.lastStudyDate || incoming.lastStudyDate >= next.lastStudyDate) {
      next.lastStudyDate = incoming.lastStudyDate;
    }
  }

  if (incoming.sessions?.length) {
    const sessionMap = new Map(next.sessions.map((session) => [session.id, session]));
    for (const session of incoming.sessions) {
      sessionMap.set(session.id, session);
    }
    next.sessions = [...sessionMap.values()]
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
      .slice(0, 30);
  }

  return next;
}

export function useStudyRecord(userId: string | null = null) {
  const [record, setRecord] = useState<StudyRecord>(() => loadRecord());
  const [cloudReady, setCloudReady] = useState(!userId);

  useEffect(() => {
    saveRecord(record);
  }, [record]);

  useEffect(() => {
    if (!userId) {
      setCloudReady(true);
      return;
    }

    const activeUserId = userId;
    let cancelled = false;

    async function loadCloudRecord() {
      const { fetchCloudStudyRecord } = await import('./auth/cloudSync');
      const cloudRecord = await fetchCloudStudyRecord(activeUserId);
      if (cancelled) {
        return;
      }

      if (cloudRecord) {
        setRecord((current) => mergeStudyRecords(current, cloudRecord));
      }
      setCloudReady(true);
    }

    loadCloudRecord();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!userId || !cloudReady) {
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const { saveCloudStudyRecord } = await import('./auth/cloudSync');
        await saveCloudStudyRecord(userId, record);
      } catch {
        // Keep local progress even if sync fails temporarily.
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [record, userId, cloudReady]);

  const submitAnswer = (input: Parameters<typeof recordStudyAnswer>[1]) => {
    setRecord((current) => recordStudyAnswer(current, input));
  };

  const resetPart = (partId: string) => {
    setRecord((current) => resetPartProgress(current, partId));
  };

  const resetChapter = (chapterId: number) => {
    setRecord((current) => resetChapterProgress(current, chapterId));
  };

  return {
    record,
    submitAnswer,
    resetPart,
    resetChapter,
    stats: getOverallStats(record),
    cloudReady,
  };
}

export function usePartProgress(partId: string, record: StudyRecord) {
  return getPartProgressFromRecord(record, partId);
}
