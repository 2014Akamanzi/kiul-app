-- ========================================
-- KIUL Complete Database Setup
-- ========================================
-- Run this entire script in Supabase SQL Editor
-- This will create all necessary tables for authentication, services, and content

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. PROFILES TABLE (User Management)
-- ========================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'instructor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 2. COURSES TABLE (Short Courses)
-- ========================================

CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tier TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  modules JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 3. MENTORSHIP GOALS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.mentorship_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  steps TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 4. COUNSELLING SESSIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS public.counselling_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 5. LEARNING MATERIALS TABLE (Admin)
-- ========================================

CREATE TABLE IF NOT EXISTS public.learning_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('course', 'guide', 'reference', 'worksheet', 'video', 'other')),
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  uploaded_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 6. STORAGE BUCKET (Learning Materials)
-- ========================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('learning-materials', 'learning-materials', true)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselling_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Courses Policies
CREATE POLICY "Users can view own courses" ON public.courses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own courses" ON public.courses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own courses" ON public.courses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own courses" ON public.courses
  FOR DELETE USING (auth.uid() = user_id);

-- Mentorship Goals Policies
CREATE POLICY "Users can view own goals" ON public.mentorship_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON public.mentorship_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON public.mentorship_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON public.mentorship_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Counselling Sessions Policies
CREATE POLICY "Users can view own sessions" ON public.counselling_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.counselling_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.counselling_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Learning Materials Policies
CREATE POLICY "Authenticated users can view materials" ON public.learning_materials
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can insert materials" ON public.learning_materials
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update materials" ON public.learning_materials
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete materials" ON public.learning_materials
  FOR DELETE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Storage Policies for Learning Materials
CREATE POLICY "Authenticated can view files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'learning-materials');

CREATE POLICY "Admins can upload files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'learning-materials' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete files" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'learning-materials' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ========================================
-- 8. INDEXES (Performance Optimization)
-- ========================================

CREATE INDEX IF NOT EXISTS idx_courses_user_id ON public.courses(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON public.mentorship_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.counselling_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ========================================
-- SETUP COMPLETE!
-- ========================================
-- Next steps:
-- 1. Register a user through your app
-- 2. Find that user in the profiles table
-- 3. Change their role to 'admin' to access admin features
-- 4. Restart your development server
-- ========================================
