# Paras-Mani Blog Management System - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or Atlas)
- npm or yarn

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your configuration
# Default values should work for local development:
# PORT=9000
# MONGO_URI=mongodb://localhost:27017/paras-mani
# JWT_SECRET=parasmani_secret
```

### 3. Create Required Directories

```bash
mkdir -p src/uploads
```

### 4. Start MongoDB

```bash
# If MongoDB is installed locally
mongod

# Or use MongoDB Atlas (update MONGO_URI in .env)
```

### 5. Run Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:9000`

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

```bash
# Copy the example env file
cp .env.example .env

# Edit .env - default should work for local development:
# VITE_BACKEND_URI=http://localhost:9000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will typically run on: `http://localhost:5173`

## API Endpoints

### Blog Routes (PUBLIC)

- `GET /api/blog` - Get all blogs
- `GET /api/blog/:id` - Get single blog

### Blog Routes (PROTECTED - Requires Auth)

- `POST /api/blog` - Create blog (multipart/form-data)
- `PUT /api/blog/:id` - Update blog (multipart/form-data)
- `DELETE /api/blog/:id` - Delete blog

## Key Features

### Backend

- Express.js REST API
- MongoDB for data storage
- JWT-based authentication
- Multer file upload handling
- CORS enabled for frontend communication

### Frontend

- React with Vite
- Blog management admin panel
- Create, read, update, delete (CRUD) operations
- Axios with interceptors for API calls
- Tailwind CSS for styling
- Error handling and validation

## Common Issues & Solutions

### 1. MongoDB Connection Error

**Issue**: "Unable to connect to MongoDB"
**Solution**:

- Ensure MongoDB is running (`mongod`)
- Check MONGO_URI in .env is correct
- For Atlas, ensure IP is whitelisted

### 2. CORS Error

**Issue**: "Access to XMLHttpRequest blocked by CORS"
**Solution**: Backend has CORS enabled by default, verify:

- Backend is running on correct port (9000)
- VITE_BACKEND_URI in frontend .env matches backend URL

### 3. Token Error (401 Unauthorized)

**Issue**: "Unauthorized" when creating/updating blogs
**Solution**:

- Ensure you're logged in as admin
- Token is automatically added to requests via API interceptor
- Check JWT_SECRET matches between frontend and backend

### 4. Image Upload Not Working

**Issue**: Images aren't uploading to server
**Solution**:

- Ensure `src/uploads` directory exists in backend
- Check file permissions on uploads directory
- Ensure FormData is properly set with file

### 5. Port Already in Use

**Issue**: "Port 9000 already in use"
**Solution**:

- Change PORT in .env to different port (9001, 9002, etc.)
- Or kill process using port 9000:
  - macOS/Linux: `lsof -i :9000 | kill -9`
  - Windows: `netstat -ano | findstr :9000` then `taskkill /PID <pid> /F`

## File Structure

```
paras-mani/
├── backend/
│   ├── src/
│   │   ├── app.js           # Express app configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/      # Custom middlewares
│   │   └── uploads/         # Uploaded files storage
│   ├── server.js            # Server entry point
│   ├── package.json
│   ├── .env                 # Environment variables (create from .env.example)
│   └── .env.example         # Example env file
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── assets/         # Images and static files
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   ├── .env                # Environment variables (create from .env.example)
│   └── .env.example        # Example env file
│
└── SETUP.md                # This file
```

## Testing the API

### Using cURL or Postman

#### Get All Blogs

```bash
curl http://localhost:9000/api/blog
```

#### Create Blog (requires auth token)

```bash
curl -X POST http://localhost:9000/api/blog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Blog" \
  -F "description=Blog description" \
  -F "category=Tech" \
  -F "content=Blog content here" \
  -F "image=@/path/to/image.jpg"
```

#### Update Blog

```bash
curl -X PUT http://localhost:9000/api/blog/BLOG_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Updated Title" \
  -F "description=Updated description" \
  -F "category=Updated Category" \
  -F "content=Updated content"
```

#### Delete Blog

```bash
curl -X DELETE http://localhost:9000/api/blog/BLOG_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Development Tips

1. **Hot Reload**: Both frontend (Vite) and backend (Nodemon) have auto-reload enabled
2. **API Testing**: Use the admin panel or Postman for testing
3. **Database Viewing**: Use MongoDB Compass for GUI access to MongoDB
4. **Debugging**: Check browser DevTools and terminal logs for errors

## Deployment Notes

For production deployment:

1. Update JWT_SECRET to a strong random string
2. Change MongoDB URI to production instance
3. Update VITE_BACKEND_URI to production API URL
4. Set NODE_ENV=production
5. Build frontend: `npm run build`
6. Use process manager (PM2, Forever, etc.) for Node.js

## Support

For issues or questions, check:

- Console logs in browser (F12)
- Terminal logs from backend server
- MongoDB connection status
