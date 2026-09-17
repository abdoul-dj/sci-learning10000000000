import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Home from "../pages/home.jsx";
import About from "../pages/about-us.jsx";
import LessonsSection from "../pages/lessons.jsx";
import LessonDetails from "../pages/LessonDetails.jsx";
import QuizListPage from "../pages/quizse.jsx";
import QuizTaking from "../pages/QuizTaking.jsx";
import QuizResult from "../pages/QuizResult.jsx";
import TipsPage from "../pages/tips.jsx";
import QualificationsPage from "../pages/certificate.jsx";
import AuthPage from "../pages/signup.jsx";
import Contact from "../pages/contact.jsx";
import NotFound from "../pages/NotFound.jsx";

import Dashboard from "../pages/dashboard.jsx";
import Users from "../pages/users.jsx";
import Profile from "../pages/profile.jsx";
import AdminLessons from "../pages/admin/Lessons.jsx";
import AdminCreateLesson from "../pages/admin/CreateLesson.jsx";
import AdminEditLesson from "../pages/admin/EditLesson.jsx";
import AdminQuizzes from "../pages/admin/Quizzes.jsx";
import AdminCreateQuiz from "../pages/admin/CreateQuiz.jsx";
import AdminEditQuiz from "../pages/admin/EditQuiz.jsx";
import AdminTips from "../pages/admin/Tips.jsx";
import AdminCertificates from "../pages/admin/Certificates.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/lessons" element={<LessonsSection />} />
      <Route path="/lessons/:id" element={<LessonDetails />} />
      <Route path="/quizse" element={<QuizListPage />} />
      <Route path="/quizzes/:id" element={<QuizTaking />} />
      <Route
        path="/quiz-result/:resultId"
        element={
          <ProtectedRoute>
            <QuizResult />
          </ProtectedRoute>
        }
      />
      <Route path="/tips" element={<TipsPage />} />
      <Route path="/certificate" element={<QualificationsPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requireAdmin>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/users" element={<Navigate to="/users" replace />} />
      <Route
        path="/admin/lessons"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLessons />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/lessons/create"
        element={
          <ProtectedRoute requireAdmin>
            <AdminCreateLesson />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/lessons/edit/:id"
        element={
          <ProtectedRoute requireAdmin>
            <AdminEditLesson />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/quizzes"
        element={
          <ProtectedRoute requireAdmin>
            <AdminQuizzes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/quizzes/create"
        element={
          <ProtectedRoute requireAdmin>
            <AdminCreateQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/quizzes/edit/:id"
        element={
          <ProtectedRoute requireAdmin>
            <AdminEditQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tips"
        element={
          <ProtectedRoute requireAdmin>
            <AdminTips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/certificates"
        element={
          <ProtectedRoute requireAdmin>
            <AdminCertificates />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
