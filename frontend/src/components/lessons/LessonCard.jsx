import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Star } from 'lucide-react';
import { formatDuration } from '../../utils/helpers';

const LessonCard = ({ lesson, showProgress = false, progress = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {lesson.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={lesson.imageUrl}
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {lesson.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Star className="h-3 w-3 mr-1" />
            {lesson.level}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {lesson.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {lesson.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatDuration(lesson.duration)}
          </div>
        </div>
        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <Link
          to={`/student/lessons/${lesson.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {showProgress && progress > 0 ? 'Continue' : 'Start Lesson'}
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
