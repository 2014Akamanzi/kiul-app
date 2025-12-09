-- Migration: Add Journal Issues and Issue Articles Tables
-- Run this if you already have the publishing system set up

-- Create Journal Issues table
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  volume INTEGER NOT NULL,
  number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Issue Articles junction table
CREATE TABLE IF NOT EXISTS public.issue_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_issues_year ON public.issues(year);
CREATE INDEX IF NOT EXISTS idx_issues_volume_number ON public.issues(volume, number);
CREATE INDEX IF NOT EXISTS idx_issue_articles_issue ON public.issue_articles(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_articles_manuscript ON public.issue_articles(manuscript_id);

-- Enable Row Level Security
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public can view published issues
CREATE POLICY "Anyone can view issues" ON public.issues
  FOR SELECT USING (true);

-- Admins can manage issues (modify this to check for admin role in production)
CREATE POLICY "Admins can manage issues" ON public.issues
  FOR ALL USING (true);

-- Public can view issue articles
CREATE POLICY "Anyone can view issue articles" ON public.issue_articles
  FOR SELECT USING (true);

-- Admins can manage issue articles
CREATE POLICY "Admins can manage issue articles" ON public.issue_articles
  FOR ALL USING (true);

-- Add comments for documentation
COMMENT ON TABLE public.issues IS 'Journal issues containing published articles';
COMMENT ON TABLE public.issue_articles IS 'Junction table linking manuscripts to journal issues';
COMMENT ON COLUMN public.issue_articles.position IS 'Order of article in the issue (1-indexed)';
