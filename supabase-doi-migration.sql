-- Migration: Add DOI registration tracking
-- Run this in Supabase SQL Editor if database already exists

-- Add DOI registration tracking columns
ALTER TABLE public.manuscripts 
  ADD COLUMN IF NOT EXISTS is_doi_registered BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS doi_registered_at TIMESTAMPTZ;

-- Add index for DOI registration status
CREATE INDEX IF NOT EXISTS idx_manuscripts_doi_registered 
  ON public.manuscripts(is_doi_registered);

-- Add comment
COMMENT ON COLUMN manuscripts.is_doi_registered IS 'Whether DOI has been registered with CrossRef';
COMMENT ON COLUMN manuscripts.doi_registered_at IS 'Timestamp when DOI was registered with CrossRef';
