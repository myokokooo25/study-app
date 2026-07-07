import type { Chapter, StudyCardData } from '../types';

import { chapter1Data2026Part1 } from './chapters/chapter1-2026-part1';
import { chapter1Data2026Part2 } from './chapters/chapter1-2026-part2';
import { chapter1Data2026Part3 } from './chapters/chapter1-2026-part3';
import { chapter1Data2026Part4 } from './chapters/chapter1-2026-part4';

import { chapter2Data2026Part1 } from './chapters/chapter2-2026-part1';
import { chapter2Data2026Part2 } from './chapters/chapter2-2026-part2';
import { chapter2Data2026Part3 } from './chapters/chapter2-2026-part3';
import { chapter2Data2026Part4 } from './chapters/chapter2-2026-part4';

import { chapter3Data2026Part1 } from './chapters/chapter3-2026-part1';
import { chapter3Data2026Part2 } from './chapters/chapter3-2026-part2';
import { chapter3Data2026Part3 } from './chapters/chapter3-2026-part3';
import { chapter3Data2026Part4 } from './chapters/chapter3-2026-part4';

import { chapter4Data2026Part1 } from './chapters/chapter4-2026-part1';
import { chapter5Data2026Part1 } from './chapters/chapter5-2026-part1';

export const chapters: Chapter[] = [
  {
    id: 1,
    titleJP: '鉄骨構造',
    titleMY: 'သံမဏိတည်ဆောက်ပုံ',
    parts: [
      { id: '1-1', titleJP: 'Part 1', titleMY: 'အပိုင်း ၁', questions: chapter1Data2026Part1 },
      { id: '1-2', titleJP: 'Part 2', titleMY: 'အပိုင်း ၂', questions: chapter1Data2026Part2 },
      { id: '1-3', titleJP: 'Part 3', titleMY: 'အပိုင်း ၃', questions: chapter1Data2026Part3 },
      { id: '1-4', titleJP: 'Part 4', titleMY: 'အပိုင်း ၄', questions: chapter1Data2026Part4 },
    ],
  },
  {
    id: 2,
    titleJP: '鉄骨加工',
    titleMY: 'သံမဏိပြုလုပ်ခြင်း',
    parts: [
      { id: '2-1', titleJP: 'Part 1', titleMY: 'အပိုင်း ၁', questions: chapter2Data2026Part1 },
      { id: '2-2', titleJP: 'Part 2', titleMY: 'အပိုင်း ၂', questions: chapter2Data2026Part2 },
      { id: '2-3', titleJP: 'Part 3', titleMY: 'အပိုင်း ၃', questions: chapter2Data2026Part3 },
      { id: '2-4', titleJP: 'Part 4', titleMY: 'အပိုင်း ၄', questions: chapter2Data2026Part4 },
    ],
  },
  {
    id: 3,
    titleJP: '品質管理',
    titleMY: 'အရည်အသွေးထိန်းချုပ်မှု',
    parts: [
      { id: '3-1', titleJP: 'Part 1', titleMY: 'အပိုင်း ၁', questions: chapter3Data2026Part1 },
      { id: '3-2', titleJP: 'Part 2', titleMY: 'အပိုင်း ၂', questions: chapter3Data2026Part2 },
      { id: '3-3', titleJP: 'Part 3', titleMY: 'အပိုင်း ၃', questions: chapter3Data2026Part3 },
      { id: '3-4', titleJP: 'Part 4', titleMY: 'အပိုင်း ၄', questions: chapter3Data2026Part4 },
    ],
  },
  {
    id: 4,
    titleJP: '安全衛生',
    titleMY: 'လုပ်ငန်းခွင်ဘေးကင်းရေးနှင့် ကျန်းမာရေး',
    parts: [
      { id: '4-1', titleJP: 'Part 1', titleMY: 'အပိုင်း ၁', questions: chapter4Data2026Part1 },
    ],
  },
  {
    id: 5,
    titleJP: '建築法規',
    titleMY: 'ဆောက်လုပ်ရေးဥပဒေနှင့် စည်းမျဉ်း',
    parts: [
      { id: '5-1', titleJP: 'Part 1', titleMY: 'အပိုင်း ၁', questions: chapter5Data2026Part1 },
    ],
  },
];

export function getAllQuestions() {
  return chapters.flatMap((chapter) =>
    chapter.parts.flatMap((part) => part.questions),
  );
}

export function getPartById(partId: string) {
  for (const chapter of chapters) {
    const part = chapter.parts.find((item) => item.id === partId);
    if (part) {
      return { chapter, part };
    }
  }
  return null;
}

export interface ChapterQuestionRef {
  serial: number;
  partId: string;
  question: StudyCardData;
}

export function getChapterById(chapterId: number) {
  return chapters.find((chapter) => chapter.id === chapterId);
}

export function getChapterQuestions(chapterId: number): ChapterQuestionRef[] {
  const chapter = getChapterById(chapterId);
  if (!chapter) {
    return [];
  }

  let serial = 0;
  return chapter.parts.flatMap((part) =>
    part.questions.map((question) => {
      serial += 1;
      return { serial, partId: part.id, question };
    }),
  );
}

export const totalQuestionCount = getAllQuestions().length;
