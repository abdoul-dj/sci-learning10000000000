import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Trophy, XCircle, CheckCircle, ArrowLeft, Home } from 'lucide-react';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, quiz } = location.state || {};

  if (!result || !quiz) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No quiz result found.</p>
        <Link to="/student/quizzes" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.totalPoints) * 100);

  return (
    <div className="max-w-2xl">
      <Link
        to="/student/quizzes"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Quizzes</span>
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-md text-center mb-6">
        <div className="flex justify-center mb-4">
          {result.passed ? (
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <Trophy className="h-12 w-12 text-green-600" />
            </div>
          ) : (
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {result.passed ? 'Congratulations!' : 'Keep Trying!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {result.passed
            ? 'You have successfully passed the quiz.'
            : 'You did not meet the passing score. Review the material and try again.'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Your Score</p>
            <p className="text-3xl font-bold text-gray-900">{percentage}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Passing Score</p>
            <p className="text-3xl font-bold text-gray-900">{quiz.passingScore}%</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Points Earned</p>
          <p className="text-2xl font-bold text-gray-900">
            {result.score} / {result.totalPoints}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Answer Review</h2>
        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const userAnswer = result.answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-600">
                        Your answer: {question.options[userAnswer] || 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-600">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/student/quizzes"
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          <Home className="h-5 w-5" />
          <span>Back to Quizzes</span>
        </Link>
        {!result.passed && (
          <button
            onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
            className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
          >
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
