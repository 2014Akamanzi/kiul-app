-- Migration: Add search functionality to existing database
-- Run this in Supabase SQL Editor if you already have the database set up

-- Add keywords column to manuscripts table
ALTER TABLE public.manuscripts ADD COLUMN IF NOT EXISTS keywords TEXT;

-- Add due_date column to review_assignments table
ALTER TABLE public.review_assignments ADD COLUMN IF NOT EXISTS due_date DATE;

-- Add index for keywords search
CREATE INDEX IF NOT EXISTS idx_manuscripts_keywords ON public.manuscripts USING gin(to_tsvector('english', keywords));

-- Create search function for articles
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
$$ LANGUAGE sql STABLE;

-- Add comment
COMMENT ON COLUMN manuscripts.keywords IS 'Comma-separated keywords for article search';
COMMENT ON COLUMN review_assignments.due_date IS 'Review deadline date';
