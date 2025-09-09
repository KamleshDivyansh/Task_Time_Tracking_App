Task and Time Tracking App
A full-stack application for managing tasks, tracking time, and viewing daily productivity summaries. Built with a modern, responsive UI featuring dark/light mode, gradient backgrounds, and smooth animations.

Tech Stack
Backend: Node.js, Express.js, MongoDB (Mongoose), JWT for authentication
Frontend: React (Vite), Tailwind CSS, Material UI, Axios, Moment.js, React Router
Deployment: Backend on Render, Frontend on Vercel

Features
Authentication: Secure signup, login, and logout with JWT-based authorization.
Task Management: Create, read, update, and delete tasks with natural language input support.
Time Tracking: Real-time start/stop timer for each task with a progress bar.
Daily Summary: Visual summary of tasks worked on, total time tracked, and task statuses.
UI/UX: Responsive design with dark/light mode toggle, gradient forms, and animated task cards.

Live Demo
Frontend: https://task-time-tracking-app.vercel.app
Backend: https://task-time-tracking-app.onrender.com


Setup Instructions (Local Development)
Prerequisites
Node.js (v16 or higher)
MongoDB Atlas account
Git

Backend Setup
Clone the repository:
git clone <your-repo-url>
cd task-tracker-app/backend

Install dependencies:
npm install

Create a .env file in backend/:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key
PORT=5000

Start the backend:
npm start
Backend runs on http://localhost:5000.

Frontend Setup
Navigate to the frontend:
cd ../frontend

Install dependencies:
npm install
npm install @mui/material @emotion/react @emotion/styled tailwindcss postcss autoprefixer axios jwt-decode moment react-router-dom

Initialize Tailwind:
npx tailwindcss init -p

Create a .env file in frontend/:
VITE_API_URL=http://localhost:5000

Start the frontend:
npm run dev
Frontend runs on http://localhost:5173.
Open http://localhost:5173 in your browser to test.

Project Structure
backend/
models/: MongoDB schemas (User, Task, TimeLog)
routes/: API routes (auth, tasks, timelogs)
controllers/: Route handlers
middleware/: Authentication middleware

frontend/
src/pages/: Main pages (Login, Signup, Dashboard, Summary)
src/components/: Reusable components (TaskForm, TaskList, Timer)
src/ThemeContext.js: Dark/light mode context
src/index.css: Tailwind and global styles

.gitignore: Ignores node_modules, .env, and build artifacts

Deployment
Backend (Render):
Push backend/ to a GitHub repository.
Create a new Web Service on Render.
Set environment variables (MONGO_URI, JWT_SECRET, PORT) in Render’s dashboard.
Deploy and note the URL (e.g., https://task-time-tracking-app.onrender.com).

Frontend (Vercel):
Push frontend/ to a GitHub repository.
Create a new project on Vercel and link the repository.
Add environment variable VITE_API_URL=https://task-time-tracking-app.onrender.com in Vercel.
Deploy and note the URL (e.g., https://task-time-tracking-app.vercel.app).

