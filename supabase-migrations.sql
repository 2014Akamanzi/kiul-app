-- KIUL Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tier TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  modules JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship goals table
CREATE TABLE IF NOT EXISTS public.mentorship_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  steps TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publications table
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  year INTEGER,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Manuscripts table (for submissions)
CREATE TABLE IF NOT EXISTS public.manuscripts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  email TEXT NOT NULL,
  abstract TEXT NOT NULL,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  status TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_notes TEXT
);

-- Counselling sessions table
CREATE TABLE IF NOT EXISTS public.counselling_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counselling_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Users can read and update their own data
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Courses: Users can manage their own courses
CREATE POLICY "Users can view own courses" ON public.courses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own courses" ON public.courses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own courses" ON public.courses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own courses" ON public.courses
  FOR DELETE USING (auth.uid() = user_id);

-- Mentorship Goals: Users can manage their own goals
CREATE POLICY "Users can view own goals" ON public.mentorship_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON public.mentorship_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON public.mentorship_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON public.mentorship_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Publications: Everyone can read, only admins can write
CREATE POLICY "Anyone can view publications" ON public.publications
  FOR SELECT USING (true);

-- Manuscripts: Users can view their own submissions
CREATE POLICY "Users can view own manuscripts" ON public.manuscripts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can submit manuscripts" ON public.manuscripts
  FOR INSERT WITH CHECK (true);

-- Counselling Sessions: Users can manage their own sessions
CREATE POLICY "Users can view own sessions" ON public.counselling_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.counselling_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.counselling_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create Storage Buckets (run in Supabase Dashboard -> Storage)
-- 1. Create bucket: publications (public)
-- 2. Create bucket: manuscripts (private)
-- 3. Set policies accordingly

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_user_id ON public.courses(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON public.mentorship_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_publications_category ON public.publications(category);
CREATE INDEX IF NOT EXISTS idx_manuscripts_status ON public.manuscripts(status);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.counselling_sessions(user_id);
