import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { userService } from '../../services/userService';
import { lessonService } from '../../services/lessonService';
import { quizService } from '../../services/quizService';
import { certificateService } from '../../services/certificateService';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    lessons: 0,
    quizzes: 0,
    certificates: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [users, lessons, quizzes, certificates] = await Promise.all([
        userService.getAllUsers(),
        lessonService.getAllLessons(),
        quizService.getAllQuizzes(),
        certificateService.getAllCertificates(),
      ]);
      setStats({
        users: users.length,
        lessons: lessons.length,
        quizzes: quizzes.length,
        certificates: certificates.length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Lessons</p>
              <p className="text-3xl font-bold text-gray-900">{stats.lessons}</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Quizzes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.quizzes}</p>
            </div>
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificates Issued</p>
              <p className="text-3xl font-bold text-gray-900">{stats.certificates}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/lessons/create"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-semibold">Create Lesson</h3>
            <p className="text-sm text-gray-600">Add a new lesson to the platform</p>
          </a>
          <a
            href="/admin/quizzes/create"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <Trophy className="h-6 w-6 text-purple-600 mb-2" />
            <h3 className="font-semibold">Create Quiz</h3>
            <p className="text-sm text-gray-600">Create a new quiz for students</p>
          </a>
          <a
            href="/admin/users"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <Users className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-semibold">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage user accounts</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
