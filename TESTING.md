# Blog Management System - Testing Guide

## Quick Start Testing

### 1. Start the Backend

```bash
cd backend
npm run dev
```

Expected output: `Server running on port 9000` and `MongoDB Connected`

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

Expected output: Shows Vite dev server URL (usually `http://localhost:5173`)

---

## Testing Workflow

### Step 1: Admin Authentication

1. Go to Admin Login page
2. Login with admin credentials (check your database or register first)
3. You should receive a JWT token (stored in localStorage)

### Step 2: Create Blog

1. Navigate to Blogs admin panel
2. Click "Add Blog" button
3. Fill in the form:
   - **Title**: "My First Blog"
   - **Description**: "This is a test blog"
   - **Category**: "Technology"
   - **Content**: "Blog content goes here..."
   - **Image**: Select an image file
4. Click "Create Blog"
5. You should see a success message

### Step 3: Verify Creation

1. The blog should appear in the blogs grid
2. Image should display correctly
3. Blog details should match what you entered

### Step 4: Edit Blog

1. Click "Edit" on any blog card
2. Modify the content (e.g., change title to "Updated Title")
3. Click "Update Blog"
4. Verify the changes appear immediately

### Step 5: Delete Blog

1. Click "Delete" on any blog card
2. Confirm the deletion
3. Blog should disappear from the list

---

## API Testing (Using cURL)

### Get Auth Token

```bash
curl -X POST http://localhost:9000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

Response example:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Save the token for authenticated requests.

### Get All Blogs (No Auth Required)

```bash
curl http://localhost:9000/api/blog
```

Response example:

```json
{
  "success": true,
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Blog",
      "description": "This is a test blog",
      "category": "Technology",
      "content": "Blog content goes here...",
      "image": "1234567890-image.jpg",
      "author": "Parasmani Team",
      "createdAt": "2024-05-12T10:30:00Z",
      "updatedAt": "2024-05-12T10:30:00Z"
    }
  ]
}
```

### Get Single Blog

```bash
curl http://localhost:9000/api/blog/507f1f77bcf86cd799439011
```

### Create Blog (Requires Auth)

```bash
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:9000/api/blog \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Test Blog" \
  -F "description=Test Description" \
  -F "category=Tech" \
  -F "content=Test Content" \
  -F "image=@/path/to/image.jpg"
```

### Update Blog (Requires Auth)

```bash
TOKEN="your-jwt-token-here"
BLOG_ID="507f1f77bcf86cd799439011"

curl -X PUT http://localhost:9000/api/blog/$BLOG_ID \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Updated Title" \
  -F "description=Updated Description" \
  -F "category=Updated" \
  -F "content=Updated Content"
```

### Delete Blog (Requires Auth)

```bash
TOKEN="your-jwt-token-here"
BLOG_ID="507f1f77bcf86cd799439011"

curl -X DELETE http://localhost:9000/api/blog/$BLOG_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## Expected Behavior

### Success Scenarios

✅ Creating blog with valid data
✅ Updating blog with optional image
✅ Viewing all blogs without authentication
✅ Viewing single blog without authentication
✅ Deleting blog with valid token
✅ Image uploads to `/uploads` folder

### Error Handling

❌ Creating blog without title → "Please enter blog title"
❌ Creating blog without description → "Please enter blog description"
❌ Creating blog without image → "Please select an image for the blog"
❌ Accessing protected routes without token → 401 Unauthorized
❌ Invalid token → 401 Unauthorized
❌ MongoDB connection failure → Error message displayed

---

## Common Test Scenarios

### Scenario 1: Complete Workflow

1. Login as admin
2. Create a new blog
3. View all blogs (should include newly created)
4. Edit the blog
5. Delete the blog
6. Verify deletion

### Scenario 2: Error Handling

1. Try creating blog without title → Should show error
2. Try creating blog without image → Should show error
3. Try accessing delete without auth → Should fail with 401

### Scenario 3: Image Upload

1. Upload blog with .jpg image
2. Verify image appears in blog card
3. Image URL should be: `http://localhost:9000/uploads/[filename]`

---

## Troubleshooting

### Blog not appearing after creation

- Check browser console for errors
- Check backend terminal for API errors
- Verify MongoDB connection
- Check API response in Network tab

### Image not displaying

- Ensure `src/uploads` directory exists in backend
- Check image file path in database
- Verify backend is serving `/uploads` correctly
- Check browser console for 404 errors

### Token/Auth errors

- Ensure you're logged in
- Check token is stored in localStorage
- Verify JWT_SECRET matches in .env
- Try logging out and back in

### CORS errors

- Verify backend is running on port 9000
- Check VITE_BACKEND_URI in frontend .env
- Ensure backend has CORS enabled (it should by default)

---

## Notes

- Token expires after 7 days
- Uploaded images are stored in `/backend/src/uploads/`
- Database: MongoDB (local or Atlas)
- Frontend state resets on page refresh (expected behavior)
- All timestamps are in ISO format (UTC)
