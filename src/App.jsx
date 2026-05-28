import { Routes, Route } from "react-router-dom";
import About from "./pages/about-us";
import BioLearning from "./pages/home"; 
import LessonsSection from "./pages/lessons";
import QuizPage from "./pages/quizse";
import QualificationsPage from "./pages/certificate";

export default function App() {
  return (
    <Routes>
      {/* Fixed: Added path and used correct component name */}
      <Route path="/home" element={<BioLearning />} /> 
      <Route path="/about-us" element={<About />} /> 
      <Route path="/lessons" element={<LessonsSection />} /> 
      <Route path="/quizse" element={<QuizPage  />} /> 
      <Route path="/certificate" element={<QualificationsPage  />} /> 
    </Routes>
  );
}