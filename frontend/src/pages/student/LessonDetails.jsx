import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessonService } from '../../services/lessonService';
import Loader from '../../components/common/Loader';
import { formatDuration } from '../../utils/helpers';

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const data = await lessonService.getLessonById(id);
      setLesson(data);
      const userProgress = data.progress?.[0];
      setProgress(userProgress?.progress || 0);
    } catch (error) {
      console.error('Failed to fetch lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (newProgress) => {
    try {
      await lessonService.updateProgress(id, newProgress, newProgress === 100);
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (loading) return <Loader />;
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="max-w-4xl">
      <Link
        to="/student/lessons"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Lessons</span>
      </Link>

      {lesson.imageUrl && (
        <img
          src={lesson.imageUrl}
          alt={lesson.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {lesson.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {lesson.level}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatDuration(lesson.duration)}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Your Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleProgressUpdate(Math.min(progress + 25, 100))}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Mark Progress
          </button>
          {lesson.videoUrl && (
            <a
              href={lesson.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
            >
              Watch Video
            </a>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{lesson.content}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
