import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/about-us";
import BioLearning from "./pages/home"; 
import LessonsSection from "./pages/lessons";
import QuizPage from "./pages/quizse";
import QualificationsPage from "./pages/certificate";
import TipsPage from "./pages/tips"
import AuthPage from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Users from   "./pages/users";

export default function App() {
  return (
    <Routes>
      {/* Fixed: Added path and used correct component name */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<BioLearning />} /> 
      <Route path="/about-us" element={<About />} /> 
      <Route path="/lessons" element={<LessonsSection />} /> 
      <Route path="/quizse" element={<QuizPage  />} /> 
      <Route path="/certificate" element={<QualificationsPage  />} /> 
      <Route path="/tips" element={<TipsPage  />} />
      <Route path="/signup" element={<AuthPage  />} />
      <Route path="/dashboard" element={<Dashboard  />} />
      <Route path="/users" element={<Users  />} />
    </Routes>
  );
}