import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, TrendingUp, Clock } from 'lucide-react';
import { lessonService } from '../../services/lessonService';
import { quizService } from '../../services/quizService';
import { certificateService } from '../../services/certificateService';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const [progress, setProgress] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progressData, attemptsData, certificatesData] = await Promise.all([
        lessonService.getUserProgress(),
        quizService.getUserAttempts(),
        certificateService.getUserCertificates(),
      ]);
      setProgress(progressData);
      setAttempts(attemptsData);
      setCertificates(certificatesData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedLessons = progress.filter((p) => p.completed).length;
  const passedQuizzes = attempts.filter((a) => a.passed).length;

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Lessons Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedLessons}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Quizzes Passed</p>
              <p className="text-3xl font-bold text-gray-900">{passedQuizzes}</p>
            </div>
            <Trophy className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificates Earned</p>
              <p className="text-3xl font-bold text-gray-900">{certificates.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Attempts</p>
              <p className="text-3xl font-bold text-gray-900">{attempts.length}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Progress</h2>
          {progress.length === 0 ? (
            <p className="text-gray-600">No lesson progress yet.</p>
          ) : (
            <div className="space-y-4">
              {progress.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.lesson.title}</p>
                    <p className="text-sm text-gray-600">{item.progress}% complete</p>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/student/lessons"
            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
          >
            View all lessons →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Quiz Attempts</h2>
          {attempts.length === 0 ? (
            <p className="text-gray-600">No quiz attempts yet.</p>
          ) : (
            <div className="space-y-4">
              {attempts.slice(0, 5).map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{attempt.quiz.title}</p>
                    <p className="text-sm text-gray-600">
                      Score: {Math.round((attempt.score / attempt.totalPoints) * 100)}%
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      attempt.passed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {attempt.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/student/quizzes"
            className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
          >
            View all quizzes →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
