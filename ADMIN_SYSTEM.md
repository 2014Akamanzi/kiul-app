# KIUL Admin System Documentation

## Overview
The admin system allows authorized users to upload, manage, and remove learning materials from the KIUL platform.

## Features

### Admin Capabilities
- **Upload Materials**: Upload various types of educational resources (PDFs, documents, videos, etc.)
- **Manage Materials**: View all uploaded materials with details
- **Delete Materials**: Remove outdated or incorrect materials
- **Categorize Content**: Organize materials by type (Course Material, Study Guide, Reference, etc.)

## Setup Instructions

### 1. Database Setup

Run the SQL migration file in your Supabase SQL Editor:

```bash
# The SQL commands are in: supabase-admin-setup.sql
```

This will create:
- `profiles` table with role support (user, admin, instructor)
- `learning_materials` table for storing material metadata
- `learning-materials` storage bucket for files
- Row Level Security (RLS) policies
- Automatic profile creation trigger

### 2. Create Admin User

1. First, sign up a regular user account through the app
2. In Supabase SQL Editor, run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

Replace `your-admin-email@example.com` with your actual admin email.

### 3. Access Admin Portal

1. Log in with your admin account
2. Navigate to `/admin/materials`
3. You should see the Materials Management interface

## Admin Portal Structure

### Pages
- `/admin/dashboard` - Manuscripts management
- `/admin/materials` - **Learning materials management** (NEW)
- `/admin/reviewers` - Reviewer management
- `/admin/issues` - Journal issues
- `/admin/publishing` - Publications upload

## Using the Materials Manager

### Upload New Material

1. Fill in the required fields:
   - **Title**: Name of the material
   - **Category**: Choose from:
     - Course Material
     - Study Guide
     - Reference Document
     - Worksheet
     - Video Resource
     - Other
   - **Description**: Brief explanation (optional)
   - **File**: Select file to upload

2. Click "Upload Material"

### Supported File Types
- Documents: PDF, DOC, DOCX, TXT
- Presentations: PPT, PPTX
- Spreadsheets: XLS, XLSX
- Media: MP4, MP3
- Archives: ZIP

### Delete Material

1. Find the material in the list
2. Click "Delete" button
3. Confirm deletion
4. File is removed from storage and database

## Security

### Role-Based Access Control
- Only users with `role = 'admin'` can access admin pages
- Regular users are redirected to login
- All admin actions are logged with user email

### Row Level Security (RLS)
- Authenticated users can view materials
- Only admins can upload, update, or delete materials
- Storage bucket has matching policies

## User Roles

| Role | Permissions |
|------|-------------|
| `user` | View materials only |
| `admin` | Full CRUD access to materials |
| `instructor` | Reserved for future use |

## Troubleshooting

### "Access Denied" Error
- Verify your user has `role = 'admin'` in profiles table
- Check you're logged in with the correct account
- Clear browser cache and reload

### Upload Fails
- Check file size (Supabase free tier has 50MB limit per file)
- Verify storage bucket exists: `learning-materials`
- Check storage policies are enabled

### Materials Not Showing
- Verify RLS policies are correctly set
- Check browser console for errors
- Ensure authenticated user has valid session

## API Endpoints

The system uses Supabase client for:
- `supabase.from('learning_materials')` - Database operations
- `supabase.storage.from('learning-materials')` - File storage
- `supabase.from('profiles')` - User role verification

## Future Enhancements

Potential additions:
- [ ] Bulk upload capability
- [ ] Material categories management
- [ ] Usage analytics (downloads, views)
- [ ] Version control for materials
- [ ] Material approval workflow
- [ ] Search and filter materials
- [ ] Instructor role with limited upload access

## Support

For issues or questions:
- Email: info.kiul@katokifoundation.org
- WhatsApp: +255 758 624 863
