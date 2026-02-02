-- Add DELETE policy for profiles table (GDPR compliance)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Add UPDATE policy for analysis_history table
CREATE POLICY "Users can update their own analysis"
ON public.analysis_history
FOR UPDATE
USING (auth.uid() = user_id);