-- KIUL Publishing System Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Manuscripts table (enhanced)
CREATE TABLE IF NOT EXISTS public.manuscripts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  email TEXT NOT NULL,
  abstract TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT,
  file_url TEXT NOT NULL,
  file_path TEXT NOT NULL,
  status TEXT DEFAULT 'submitted',
  final_pdf TEXT,
  doi TEXT,
  publication_date DATE,
  keywords TEXT,
  is_doi_registered BOOLEAN DEFAULT FALSE,
  doi_registered_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviewers table
CREATE TABLE IF NOT EXISTS public.reviewers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  expertise TEXT NOT NULL,
  affiliation TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.reviewers(id) ON DELETE SET NULL,
  decision TEXT NOT NULL,
  comments TEXT,
  anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Review Assignments table
CREATE TABLE IF NOT EXISTS public.review_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.reviewers(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  due_date DATE
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_manuscripts_status ON public.manuscripts(status);
CREATE INDEX IF NOT EXISTS idx_manuscripts_user_id ON public.manuscripts(user_id);
CREATE INDEX IF NOT EXISTS idx_manuscripts_doi ON public.manuscripts(doi);
CREATE INDEX IF NOT EXISTS idx_manuscripts_keywords ON public.manuscripts USING gin(to_tsvector('english', keywords));
CREATE INDEX IF NOT EXISTS idx_review_assignments_manuscript ON public.review_assignments(manuscript_id);
CREATE INDEX IF NOT EXISTS idx_review_assignments_reviewer ON public.review_assignments(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_manuscript ON public.reviews(manuscript_id);

-- Enable Row Level Security
ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviewers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Manuscripts: Anyone can submit, users can view their own, admins see all
CREATE POLICY "Anyone can submit manuscripts" ON public.manuscripts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own manuscripts" ON public.manuscripts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all manuscripts" ON public.manuscripts
  FOR ALL USING (true); -- Add admin role check in production

-- Reviewers: Only admins can manage
CREATE POLICY "Admins can manage reviewers" ON public.reviewers
  FOR ALL USING (true); -- Add admin role check in production

-- Reviews: Reviewers can create, admins can view all
CREATE POLICY "Reviewers can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all reviews" ON public.reviews
  FOR SELECT USING (true);

-- Review Assignments: Admins manage, reviewers can view their assignments
CREATE POLICY "Admins can manage assignments" ON public.review_assignments
  FOR ALL USING (true);

-- Insert sample reviewers
INSERT INTO public.reviewers (name, email, expertise, affiliation) VALUES
  ('Dr. Sarah Mwangi', 'sarah.mwangi@example.com', 'Ubuntu Philosophy, Leadership Studies', 'University of Nairobi'),
  ('Prof. John Kamau', 'john.kamau@example.com', 'African Development, Social Sciences', 'Makerere University'),
  ('Dr. Grace Ochieng', 'grace.ochieng@example.com', 'Research Methods, Academic Writing', 'Kenyatta University')
ON CONFLICT (email) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to manuscripts table
CREATE TRIGGER update_manuscripts_updated_at
  BEFORE UPDATE ON public.manuscripts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Journal Issues table
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  volume INTEGER NOT NULL,
  number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Issue Articles junction table
CREATE TABLE IF NOT EXISTS public.issue_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for journal issues
CREATE INDEX IF NOT EXISTS idx_issues_year ON public.issues(year);
CREATE INDEX IF NOT EXISTS idx_issues_volume_number ON public.issues(volume, number);
CREATE INDEX IF NOT EXISTS idx_issue_articles_issue ON public.issue_articles(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_articles_manuscript ON public.issue_articles(manuscript_id);

-- RLS Policies for Issues
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_articles ENABLE ROW LEVEL SECURITY;

-- Public can view published issues
CREATE POLICY "Anyone can view issues" ON public.issues
  FOR SELECT USING (true);

-- Admins can manage issues
CREATE POLICY "Admins can manage issues" ON public.issues
  FOR ALL USING (true);

-- Public can view issue articles
CREATE POLICY "Anyone can view issue articles" ON public.issue_articles
-- Admins can manage issue articles
CREATE POLICY "Admins can manage issue articles" ON public.issue_articles
  FOR ALL USING (true);

-- Search function for articles
CREATE OR REPLACE FUNCTION search_articles(search_term TEXT)
RETURNS SETOF manuscripts AS $$
  SELECT * FROM manuscripts
  WHERE 
    status = 'published' AND (
    title ILIKE '%' || search_term || '%' OR
    abstract ILIKE '%' || search_term || '%' OR
    authors ILIKE '%' || search_term || '%' OR
    keywords ILIKE '%' || search_term || '%' OR
    doi ILIKE '%' || search_term || '%')
  ORDER BY publication_date DESC;
$$ LANGUAGE sql STABLE;sue articles
CREATE POLICY "Admins can manage issue articles" ON public.issue_articles
  FOR ALL USING (true);
