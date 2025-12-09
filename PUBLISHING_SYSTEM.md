# KIUL Publishing System Documentation

## Overview

The KIUL Publishing System is a complete peer-review and manuscript management workflow that handles the entire publication pipeline from submission to publication.

## Features

✅ **Manuscript Dashboard** - View all submissions with filtering by status
✅ **Review Workflow** - Accept, reject, or request revisions with detailed feedback
✅ **Peer Review Assignment** - Assign manuscripts to expert reviewers
✅ **Reviewer Management** - Add and manage a pool of peer reviewers
✅ **Email Notifications** - Automated emails for submissions, assignments, and decisions
✅ **Anonymized Reviews** - Protect reviewer identity from authors
✅ **Status Tracking** - Complete pipeline from submission to publication

## Publication Pipeline

```
submitted → assigned → under_review → revisions_requested → accepted → typeset → published
```

### Status Definitions

- **submitted**: Initial submission received
- **assigned**: Reviewer has been assigned
- **under_review**: Actively being reviewed
- **revisions_requested**: Author needs to make changes
- **accepted**: Manuscript approved for publication
- **typeset**: In final formatting stage
- **published**: Live on the platform
- **rejected**: Not accepted for publication

## Database Schema

### Tables

#### `manuscripts`
- Enhanced from original with additional fields
- Tracks submission metadata and current status
- Links to user (author) via `user_id`

#### `reviewers`
- Pool of expert reviewers
- Stores name, email, expertise, affiliation, bio
- Used for assigning reviews

#### `review_assignments`
- Links manuscripts to assigned reviewers
- Tracks assignment date and completion status
- One manuscript can have multiple reviewers

#### `reviews`
- Stores reviewer decisions and feedback
- Anonymous flag protects reviewer identity
- Decision updates manuscript status

## Setup Instructions

### 1. Database Setup

Run the SQL migrations in Supabase SQL Editor:

```bash
# File: supabase-publishing-schema.sql
```

This creates:
- 4 new tables (manuscripts enhanced, reviewers, review_assignments, reviews)
- Row Level Security policies
- Indexes for performance
- Sample reviewers

### 2. Environment Variables

Add to your `.env.local`:

```bash
RESEND_API_KEY=re_your-api-key-here
```

Get your API key from: https://resend.com/api-keys

### 3. Email Configuration

The system uses Resend for transactional emails:

**Email Triggers:**
1. **Manuscript Submission** → Author receives confirmation
2. **Reviewer Assignment** → Reviewer notified of new assignment
3. **Review Decision** → Author receives decision and feedback

**If RESEND_API_KEY is not set:**
- Emails are logged to console instead of sending
- All other functionality works normally

### 4. Admin Routes

Access these routes with admin privileges:

- `/admin/dashboard` - Main manuscript dashboard
- `/admin/dashboard/review/[id]` - Review specific manuscript
- `/admin/dashboard/assign/[id]` - Assign reviewer to manuscript
- `/admin/reviewers` - Manage reviewer pool

## User Workflows

### Admin: Reviewing a Manuscript

1. Go to `/admin/dashboard`
2. Click "Review Manuscript" on any submission
3. Read the abstract and download the full manuscript
4. Select a decision:
   - Under Review
   - Request Revisions
   - Accept for Publication
   - Reject
   - Move to Typesetting
   - Publish
5. Provide detailed feedback comments
6. Submit review → Author receives email notification

### Admin: Assigning a Reviewer

1. Go to `/admin/dashboard`
2. Click "Assign Reviewer" on submitted manuscript
3. Browse available reviewers by expertise
4. Click "Assign" on selected reviewer
5. Manuscript status updates to "assigned"
6. Reviewer receives email notification

### Admin: Managing Reviewers

1. Go to `/admin/reviewers`
2. Click "+ Add Reviewer"
3. Enter reviewer details:
   - Name (required)
   - Email (required)
   - Expertise (required)
   - Affiliation (optional)
   - Bio (optional)
4. Reviewers appear in assignment pool

### Author: Track Submission Status

1. Authors can view their manuscript status in dashboard
2. Email notifications keep them updated
3. Review feedback is provided anonymously

## Anonymity & Privacy

### Reviewer Anonymity
- Reviews are marked as `anonymous: true` by default
- Authors see decision and comments but NOT reviewer identity
- Maintains integrity of peer review process

### Author Privacy for Reviewers
Currently, reviewers can see author information. To implement double-blind review:

1. Add `blind_review` flag to manuscripts table
2. Filter author details when loading manuscript for reviewers
3. Redact author names from downloaded files

## API Endpoints

### POST `/api/email`

Send email notification

**Request Body:**
```json
{
  "to": "user@example.com",
  "subject": "Email subject",
  "text": "Email body content"
}
```

**Response:**
```json
{
  "message": "Email sent successfully",
  "data": { ... }
}
```

## Dashboard Features

### Statistics Cards
- Total Submissions
- Under Review (yellow)
- Pending Assignment (blue)
- Accepted (green)

### Status Filters
Quick filter buttons for each status:
- All, Submitted, Assigned, Under Review, Revisions Requested, Accepted, Rejected, Published

### Color-Coded Status Badges
Each status has a distinct color for quick identification

## Email Templates

### Submission Confirmation
```
Subject: Manuscript Submission Received - KIUL

Dear Author,

Your manuscript "[Title]" has been successfully submitted to KIUL Publishing.

We will review your submission and contact you with next steps.

Best regards,
KIUL Editorial Team
```

### Reviewer Assignment
```
Subject: New Manuscript Review Assignment - KIUL

Dear [Reviewer Name],

You have been assigned to review a new manuscript:

Title: [Title]
Type: [Journal/Book]

Please log in to the KIUL admin dashboard to access the manuscript and submit your review.

Best regards,
KIUL Editorial Team
```

### Decision Notification
```
Subject: KIUL Manuscript Decision: [DECISION]

Dear Author,

Your manuscript "[Title]" has been reviewed.

Decision: [ACCEPTED/REJECTED/REVISIONS REQUESTED]

Comments:
[Reviewer feedback]

Best regards,
KIUL Editorial Team
```

## Next Steps

### Recommended Enhancements

1. **Role-Based Access Control**
   - Add `role` field to users table (admin, reviewer, author)
   - Protect admin routes with middleware
   - Allow reviewers limited dashboard access

2. **Double-Blind Review**
   - Add option to hide author identity from reviewers
   - Redact author information in manuscript files

3. **Multiple Reviewers Per Manuscript**
   - Allow 2-3 reviewers per submission
   - Aggregate decisions before final status update
   - Show all reviewer feedback to admin

4. **Revision Tracking**
   - Allow authors to upload revised versions
   - Track version history
   - Compare changes between versions

5. **Advanced Email Templates**
   - HTML email formatting with branding
   - Attachment support for PDFs
   - Email preference management

6. **Review Deadlines**
   - Add `deadline` field to review_assignments
   - Send reminder emails
   - Highlight overdue reviews in dashboard

7. **Publication Queue**
   - Manage typesetting and publication schedule
   - Batch publish multiple manuscripts
   - Preview before going live

## Testing Checklist

- [ ] Run SQL migrations in Supabase
- [ ] Add sample reviewers
- [ ] Submit test manuscript via `/publishing/submit`
- [ ] View submission in `/admin/dashboard`
- [ ] Assign reviewer to manuscript
- [ ] Submit review decision with feedback
- [ ] Verify status updates correctly
- [ ] Check email notifications (if Resend configured)
- [ ] Test all status transitions
- [ ] Filter dashboard by different statuses
- [ ] Add/delete reviewers

## Troubleshooting

**Manuscripts not appearing in dashboard:**
- Check RLS policies in Supabase
- Verify user has admin role
- Check browser console for errors

**Emails not sending:**
- Verify `RESEND_API_KEY` in `.env.local`
- Check Resend dashboard for API key status
- Review server logs for email errors
- Emails will log to console if API key not set

**Reviewer assignment failing:**
- Ensure reviewers exist in database
- Check review_assignments table has correct foreign keys
- Verify manuscript status is "submitted"

## Support

For questions or issues:
- Review this documentation
- Check Supabase logs
- Inspect browser console errors
- Review server logs in deployment platform
