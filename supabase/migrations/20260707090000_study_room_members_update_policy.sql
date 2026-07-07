-- Allow members to update their own row (rejoin / display name change).
-- Required when join uses insert-on-conflict fallback via UPDATE.
CREATE POLICY study_room_members_update ON public.study_room_members
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
