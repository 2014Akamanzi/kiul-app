-- Editorial Analytics RPC Functions for KIUL Publishing System
-- Run this in Supabase SQL Editor

-- =====================================================
-- FUNCTION 1: Editorial Statistics Overview
-- =====================================================
CREATE OR REPLACE FUNCTION editorial_stats()
RETURNS TABLE (
  label TEXT,
  count BIGINT,
  avg_review_days NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  -- Total Submissions
  SELECT 
    'Total Submissions'::TEXT as label,
    COUNT(*)::BIGINT as count,
    NULL::NUMERIC as avg_review_days
  FROM manuscripts
  
  UNION ALL
  
  -- Under Review
  SELECT 
    'Under Review'::TEXT,
    COUNT(*)::BIGINT,
    NULL::NUMERIC
  FROM manuscripts 
  WHERE status = 'under_review'
  
  UNION ALL
  
  -- Accepted
  SELECT 
    'Accepted'::TEXT,
    COUNT(*)::BIGINT,
    NULL::NUMERIC
  FROM manuscripts 
  WHERE status = 'accepted'
  
  UNION ALL
  
  -- Published
  SELECT 
    'Published'::TEXT,
    COUNT(*)::BIGINT,
    NULL::NUMERIC
  FROM manuscripts 
  WHERE status = 'published'
  
  UNION ALL
  
  -- Rejected
  SELECT 
    'Rejected'::TEXT,
    COUNT(*)::BIGINT,
    NULL::NUMERIC
  FROM manuscripts 
  WHERE status = 'rejected'
  
  UNION ALL
  
  -- Revision Requested
  SELECT 
    'Revision Requested'::TEXT,
    COUNT(*)::BIGINT,
    NULL::NUMERIC
  FROM manuscripts 
  WHERE status = 'revision_requested'
  
  UNION ALL
  
  -- Average Review Time
  SELECT
    'Avg Review Time'::TEXT,
    NULL::BIGINT,
    ROUND(
      AVG(
        EXTRACT(DAY FROM (
          COALESCE(decision_date, NOW()) - submitted_at
        ))
      )::NUMERIC,
      1
    ) as avg_review_days
  FROM manuscripts
  WHERE status IN ('accepted', 'rejected', 'revision_requested');
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 2: Monthly Submission Trends
-- =====================================================
CREATE OR REPLACE FUNCTION monthly_submission_trends(months_back INT DEFAULT 12)
RETURNS TABLE (
  month TEXT,
  submissions BIGINT,
  accepted BIGINT,
  rejected BIGINT,
  published BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(date_trunc('month', m.submitted_at), 'Mon YYYY')::TEXT as month,
    COUNT(*)::BIGINT as submissions,
    COUNT(*) FILTER (WHERE m.status = 'accepted')::BIGINT as accepted,
    COUNT(*) FILTER (WHERE m.status = 'rejected')::BIGINT as rejected,
    COUNT(*) FILTER (WHERE m.status = 'published')::BIGINT as published
  FROM manuscripts m
  WHERE m.submitted_at >= NOW() - (months_back || ' months')::INTERVAL
  GROUP BY date_trunc('month', m.submitted_at)
  ORDER BY date_trunc('month', m.submitted_at) DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 3: Reviewer Performance Stats
-- =====================================================
CREATE OR REPLACE FUNCTION reviewer_performance()
RETURNS TABLE (
  reviewer_id UUID,
  reviewer_name TEXT,
  reviewer_email TEXT,
  total_reviews BIGINT,
  completed_reviews BIGINT,
  pending_reviews BIGINT,
  avg_completion_days NUMERIC,
  acceptance_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id as reviewer_id,
    r.name as reviewer_name,
    r.email as reviewer_email,
    COUNT(rev.id)::BIGINT as total_reviews,
    COUNT(rev.id) FILTER (WHERE rev.status = 'completed')::BIGINT as completed_reviews,
    COUNT(rev.id) FILTER (WHERE rev.status = 'pending')::BIGINT as pending_reviews,
    ROUND(
      AVG(
        EXTRACT(DAY FROM (rev.completed_at - rev.assigned_at))
      ) FILTER (WHERE rev.status = 'completed')::NUMERIC,
      1
    ) as avg_completion_days,
    ROUND(
      (COUNT(*) FILTER (WHERE rev.recommendation = 'accept')::NUMERIC / 
       NULLIF(COUNT(*) FILTER (WHERE rev.status = 'completed')::NUMERIC, 0) * 100),
      1
    ) as acceptance_rate
  FROM reviewers r
  LEFT JOIN reviews rev ON r.id = rev.reviewer_id
  GROUP BY r.id, r.name, r.email
  ORDER BY total_reviews DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 4: Manuscript Status Distribution
-- =====================================================
CREATE OR REPLACE FUNCTION status_distribution()
RETURNS TABLE (
  status TEXT,
  count BIGINT,
  percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH total AS (
    SELECT COUNT(*)::NUMERIC as total_count
    FROM manuscripts
  )
  SELECT 
    m.status::TEXT,
    COUNT(*)::BIGINT as count,
    ROUND((COUNT(*)::NUMERIC / t.total_count * 100), 1) as percentage
  FROM manuscripts m
  CROSS JOIN total t
  GROUP BY m.status, t.total_count
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 5: Recent Activity Feed
-- =====================================================
CREATE OR REPLACE FUNCTION recent_activity(limit_count INT DEFAULT 20)
RETURNS TABLE (
  activity_type TEXT,
  manuscript_id UUID,
  manuscript_title TEXT,
  author_name TEXT,
  reviewer_name TEXT,
  event_date TIMESTAMPTZ,
  description TEXT
) AS $$
BEGIN
  RETURN QUERY
  -- Manuscript Submissions
  SELECT 
    'submission'::TEXT as activity_type,
    m.id as manuscript_id,
    m.title as manuscript_title,
    m.authors as author_name,
    NULL::TEXT as reviewer_name,
    m.submitted_at as event_date,
    'New manuscript submitted'::TEXT as description
  FROM manuscripts m
  
  UNION ALL
  
  -- Reviews Completed
  SELECT 
    'review'::TEXT,
    m.id,
    m.title,
    m.authors,
    r.name,
    rev.completed_at,
    'Review completed: ' || rev.recommendation
  FROM reviews rev
  JOIN manuscripts m ON rev.manuscript_id = m.id
  JOIN reviewers r ON rev.reviewer_id = r.id
  WHERE rev.status = 'completed'
  
  UNION ALL
  
  -- Manuscripts Published
  SELECT 
    'publication'::TEXT,
    m.id,
    m.title,
    m.authors,
    NULL::TEXT,
    m.published_at,
    'Manuscript published'
  FROM manuscripts m
  WHERE m.status = 'published' AND m.published_at IS NOT NULL
  
  ORDER BY event_date DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 6: Time-to-Decision Metrics
-- =====================================================
CREATE OR REPLACE FUNCTION time_to_decision_stats()
RETURNS TABLE (
  metric TEXT,
  days NUMERIC,
  manuscript_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'Average Time to Decision'::TEXT as metric,
    ROUND(AVG(EXTRACT(DAY FROM (decision_date - submitted_at)))::NUMERIC, 1) as days,
    COUNT(*)::BIGINT as manuscript_count
  FROM manuscripts
  WHERE decision_date IS NOT NULL
  
  UNION ALL
  
  SELECT 
    'Fastest Decision'::TEXT,
    ROUND(MIN(EXTRACT(DAY FROM (decision_date - submitted_at)))::NUMERIC, 1),
    COUNT(*) FILTER (
      WHERE EXTRACT(DAY FROM (decision_date - submitted_at)) = 
        (SELECT MIN(EXTRACT(DAY FROM (decision_date - submitted_at))) FROM manuscripts WHERE decision_date IS NOT NULL)
    )::BIGINT
  FROM manuscripts
  WHERE decision_date IS NOT NULL
  
  UNION ALL
  
  SELECT 
    'Longest Decision'::TEXT,
    ROUND(MAX(EXTRACT(DAY FROM (decision_date - submitted_at)))::NUMERIC, 1),
    COUNT(*) FILTER (
      WHERE EXTRACT(DAY FROM (decision_date - submitted_at)) = 
        (SELECT MAX(EXTRACT(DAY FROM (decision_date - submitted_at))) FROM manuscripts WHERE decision_date IS NOT NULL)
    )::BIGINT
  FROM manuscripts
  WHERE decision_date IS NOT NULL;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 7: Author Submission Statistics
-- =====================================================
CREATE OR REPLACE FUNCTION author_statistics()
RETURNS TABLE (
  total_authors BIGINT,
  authors_with_multiple_submissions BIGINT,
  avg_submissions_per_author NUMERIC,
  top_author TEXT,
  top_author_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH author_counts AS (
    SELECT 
      TRIM(SPLIT_PART(authors, ',', 1)) as first_author,
      COUNT(*) as submission_count
    FROM manuscripts
    GROUP BY TRIM(SPLIT_PART(authors, ',', 1))
  )
  SELECT 
    COUNT(DISTINCT first_author)::BIGINT as total_authors,
    COUNT(*) FILTER (WHERE submission_count > 1)::BIGINT as authors_with_multiple,
    ROUND(AVG(submission_count)::NUMERIC, 2) as avg_submissions,
    (SELECT first_author FROM author_counts ORDER BY submission_count DESC LIMIT 1)::TEXT as top_author,
    (SELECT submission_count FROM author_counts ORDER BY submission_count DESC LIMIT 1)::BIGINT as top_count
  FROM author_counts;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- FUNCTION 8: DOI Registration Statistics
-- =====================================================
CREATE OR REPLACE FUNCTION doi_statistics()
RETURNS TABLE (
  total_dois BIGINT,
  registered_dois BIGINT,
  pending_registration BIGINT,
  registration_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE doi IS NOT NULL)::BIGINT as total_dois,
    COUNT(*) FILTER (WHERE is_doi_registered = true)::BIGINT as registered_dois,
    COUNT(*) FILTER (WHERE doi IS NOT NULL AND (is_doi_registered = false OR is_doi_registered IS NULL))::BIGINT as pending_registration,
    ROUND(
      (COUNT(*) FILTER (WHERE is_doi_registered = true)::NUMERIC / 
       NULLIF(COUNT(*) FILTER (WHERE doi IS NOT NULL)::NUMERIC, 0) * 100),
      1
    ) as registration_rate
  FROM manuscripts;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- Grant execute permissions
-- =====================================================
GRANT EXECUTE ON FUNCTION editorial_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION monthly_submission_trends(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION reviewer_performance() TO authenticated;
GRANT EXECUTE ON FUNCTION status_distribution() TO authenticated;
GRANT EXECUTE ON FUNCTION recent_activity(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION time_to_decision_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION author_statistics() TO authenticated;
GRANT EXECUTE ON FUNCTION doi_statistics() TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_manuscripts_status ON manuscripts(status);
CREATE INDEX IF NOT EXISTS idx_manuscripts_submitted_at ON manuscripts(submitted_at);
CREATE INDEX IF NOT EXISTS idx_manuscripts_decision_date ON manuscripts(decision_date);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_completed_at ON reviews(completed_at);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Analytics RPC functions created successfully!';
  RAISE NOTICE '✓ editorial_stats()';
  RAISE NOTICE '✓ monthly_submission_trends(months_back)';
  RAISE NOTICE '✓ reviewer_performance()';
  RAISE NOTICE '✓ status_distribution()';
  RAISE NOTICE '✓ recent_activity(limit_count)';
  RAISE NOTICE '✓ time_to_decision_stats()';
  RAISE NOTICE '✓ author_statistics()';
  RAISE NOTICE '✓ doi_statistics()';
END $$;
