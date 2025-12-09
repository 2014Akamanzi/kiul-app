-- Migration: Add Typesetting Fields to Manuscripts Table
-- Run this if you already have the manuscripts table created

-- Add final_pdf column (URL to published PDF)
ALTER TABLE public.manuscripts 
ADD COLUMN IF NOT EXISTS final_pdf TEXT;

-- Add doi column (Digital Object Identifier)
ALTER TABLE public.manuscripts 
ADD COLUMN IF NOT EXISTS doi TEXT;

-- Add publication_date column (Date when published)
ALTER TABLE public.manuscripts 
ADD COLUMN IF NOT EXISTS publication_date DATE;

-- Add comment for documentation
COMMENT ON COLUMN public.manuscripts.final_pdf IS 'URL to the final published PDF';
COMMENT ON COLUMN public.manuscripts.doi IS 'Digital Object Identifier for citation';
COMMENT ON COLUMN public.manuscripts.publication_date IS 'Date when manuscript was published';

-- Create index for DOI lookups
CREATE INDEX IF NOT EXISTS idx_manuscripts_doi ON public.manuscripts(doi);
CREATE INDEX IF NOT EXISTS idx_manuscripts_publication_date ON public.manuscripts(publication_date);
