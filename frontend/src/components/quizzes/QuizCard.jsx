import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trophy, CheckCircle } from 'lucide-react';

const QuizCard = ({ quiz, showAttempts = false, attempts = [] }) => {
  const latestAttempt = attempts[0];
  const passed = latestAttempt?.passed;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
            Quiz
          </span>
          {showAttempts && latestAttempt && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                passed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {passed ? 'Passed' : 'Failed'}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {quiz.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {quiz.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {quiz.timeLimit} min
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 mr-1" />
            {quiz.passingScore}% to pass
          </div>
        </div>
        {showAttempts && latestAttempt && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latest Score:</span>
              <span className="font-semibold">
                {Math.round((latestAttempt.score / latestAttempt.totalPoints) * 100)}%
              </span>
            </div>
          </div>
        )}
        <Link
          to={`/student/quizzes/${quiz.id}`}
          className="block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          {showAttempts && latestAttempt ? 'Retake Quiz' : 'Start Quiz'}
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;
