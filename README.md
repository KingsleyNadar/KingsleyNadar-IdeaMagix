# IdeaMagix - Lecture Scheduling System

IdeaMagix is a full-stack web app for managing course catalogs and scheduling lectures. It has two main views: an Admin dashboard for managing courses and schedules, and an Instructor dashboard where teachers can check their assigned lectures.

## Features

- **Role-based Access**: Separate flows for Admins and Instructors.
- **Admin Dashboard**:
  - Add, view, and delete courses in the catalogue.
  - Upload course thumbnail images.
  - Schedule lectures (assign instructors to specific courses and dates).
  - Prevents double-booking instructors on the same date.
- **Instructor Dashboard**:
  - Instructors can log in and see a personalized schedule of their upcoming lectures.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Sonner, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Multer.

## Getting Started

Follow these steps to get the app running locally.

### 1. Backend Setup

First, navigate to the `server` folder and install the dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your environment variables. You'll need the MongoDB URI (credentials are provided below) and a port:
```env
PORT=5000
MONGODB_URI=mongodb+srv://kingsleyshark_db_user:i2aXO5x0JXtlwkxz@cluster.mongodb.net/IdeaMagix?retryWrites=true&w=majority
```

Start the backend server:
```bash
npm start
```

### 2. Frontend Setup

In a new terminal, navigate to the `frontend` folder and install the dependencies:
```bash
cd frontend
npm install
```

Run the development server:
```bash
npm run dev
```
The app should now be running at `http://localhost:5173`.

## Dependencies

**Frontend:**
- `react`, `react-dom`, `react-router-dom`
- `tailwindcss`, `clsx`, `tailwind-merge`
- `lucide-react`, `sonner`
- `axios`, `date-fns`
- `vite`

**Backend:**
- `express`, `mongoose`
- `cors`, `dotenv`, `multer`
- `nodemon`

## Credentials

Use these credentials to connect to the MongoDB Atlas database:
- **User**: `kingsleyshark_db_user`
- **Password**: `i2aXO5x0JXtlwkxz`

Make sure to include these in your `MONGODB_URI` connection string.

## App Routes

### Frontend Routes
- `/` - Login
- `/admin` - Admin Dashboard
- `/admin/schedule` - Lecture scheduling interface
- `/admin/coursecatalogue` - Course management
- `/instructor/*` - Instructor Dashboard

### API Endpoints

**Auth:**
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users

**Admin:**
- `GET /api/admin/instructors` - Get list of instructors
- `POST /api/admin/courses` - Create course (with image upload)
- `GET /api/admin/courses` - List courses
- `DELETE /api/admin/courses/:id` - Delete course and its lectures
- `POST /api/admin/lectures` - Schedule a lecture
- `GET /api/admin/lectures` - List all scheduled lectures

**Instructor:**
- `GET /api/instructor/lectures/:instructorId` - Get lectures for a specific instructor
