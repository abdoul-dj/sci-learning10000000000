# ScienceLearn - Educational Platform

A full-stack educational learning platform with lessons, quizzes, tips, and certificates.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MySQL (mysql2/promise)

## Setup

### Prerequisites

- Node.js 18+
- MySQL Server running locally

### Installation

```bash
# Install all dependencies
npm run install:all

# Configure backend database (edit backend/.env if needed)
# Default: root user, no password, database: sciencelearn

# Initialize database with schema and seed data
npm run db:init

# Start both frontend and backend
npm run dev
```

### Default Admin Account

- Email: `admin@sciencelearn.com`
- Password: `Admin@123`

## URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Project Structure

```
├── frontend/          # React client + admin dashboard
├── backend/           # Express API + MySQL
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── database/
│   └── server.js
```

## Features

- Student: Lessons, MCQ Quizzes, Tips, Certificate Requests
- Admin: Manage lessons, quizzes, tips, certificate approvals
- 80% minimum score for certificate eligibility
- JWT authentication with role-based access
