-- Create subscription plan enum
CREATE TYPE public.subscription_plan AS ENUM ('free', 'pro', 'business');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan subscription_plan NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  monthly_analysis_count INTEGER NOT NULL DEFAULT 0,
  analysis_reset_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (date_trunc('month', now()) + interval '1 month'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create analysis_history table
CREATE TABLE public.analysis_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  analysis_summary JSONB,
  insights JSONB,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on analysis_history
ALTER TABLE public.analysis_history ENABLE ROW LEVEL SECURITY;

-- Analysis history RLS policies
CREATE POLICY "Users can view their own analysis history"
ON public.analysis_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis"
ON public.analysis_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis"
ON public.analysis_history FOR DELETE
USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get plan limits
CREATE OR REPLACE FUNCTION public.get_plan_limits(plan subscription_plan)
RETURNS INTEGER AS $$
BEGIN
  CASE plan
    WHEN 'free' THEN RETURN 3;
    WHEN 'pro' THEN RETURN 100;
    WHEN 'business' THEN RETURN -1; -- unlimited
    ELSE RETURN 0;
  END CASE;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Function to check if user can analyze
CREATE OR REPLACE FUNCTION public.can_user_analyze(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_profile profiles%ROWTYPE;
  v_limit INTEGER;
BEGIN
  SELECT * INTO v_profile FROM profiles WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN RETURN FALSE; END IF;
  
  -- Reset count if new month
  IF v_profile.analysis_reset_date <= now() THEN
    UPDATE profiles 
    SET monthly_analysis_count = 0,
        analysis_reset_date = date_trunc('month', now()) + interval '1 month'
    WHERE user_id = p_user_id;
    RETURN TRUE;
  END IF;
  
  v_limit := get_plan_limits(v_profile.subscription_plan);
  
  IF v_limit = -1 THEN RETURN TRUE; END IF;
  
  RETURN v_profile.monthly_analysis_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to increment analysis count
CREATE OR REPLACE FUNCTION public.increment_analysis_count(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET monthly_analysis_count = monthly_analysis_count + 1
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;