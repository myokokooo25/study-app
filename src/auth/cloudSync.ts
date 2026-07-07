import { getSupabaseClient } from '../lib/supabase';
import type { StudyRecord } from '../types';
import { emptyRecord, mergeStudyRecords } from '../studyRecord';

export async function fetchCloudStudyRecord(userId: string): Promise<StudyRecord | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('user_study_records')
    .select('record')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data?.record) {
    return null;
  }

  return mergeStudyRecords(emptyRecord(), data.record as StudyRecord);
}

export async function saveCloudStudyRecord(userId: string, record: StudyRecord) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from('user_study_records').upsert({
    user_id: userId,
    record,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }
}
