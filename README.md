# Task & Habit Tracker

A full-stack productivity application that helps users manage daily tasks, build consistent habits, track progress, and stay organized through a personalized dashboard.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- User-specific tasks and habits

### Task Management
- Create, edit, and delete tasks
- Mark tasks as completed
- Set task priorities
- Filter tasks
- View recent tasks on the dashboard

### Habit Tracking
- Create, edit, and delete habits
- Track daily habit completion
- Store habit completion dates
- Calculate current habit streaks
- View habit completion status

### Dashboard
- Total tasks overview
- Completed tasks overview
- Active habits count
- Best current habit streak
- Recent tasks section
- Daily habits section

## Tech Stack

### Frontend
- React
- JavaScript
- CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)

## Project Structure

```text
Task-Habit-Tracker/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Navigate to the project directory

```bash
cd Task-Habit-Tracker
```

### 3. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 4. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

## API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get user tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Habits

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/habits` | Get user habits |
| POST | `/api/habits` | Create a habit |
| PUT | `/api/habits/:id` | Update a habit |
| DELETE | `/api/habits/:id` | Delete a habit |
| PATCH | `/api/habits/:id/complete` | Toggle habit completion |

## Authentication

The application uses JWT authentication to protect private routes and user data.

Authenticated requests include a token in the Authorization header:

```text
Authorization: Bearer <token>
```

## Habit Streaks

Habit completion dates are stored in the database. The application calculates consecutive completion days based on the habit's completion history to track current streaks.

## Future Improvements

- Weekly productivity analytics
- Habit completion calendar
- Improved loading states and error handling
- Responsive design improvements
- Deployment

## Author

Developed as a full-stack web development project using React, Node.js, Express.js, and MongoDB.
