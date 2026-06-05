import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuizForm from '../../components/quizzes/QuizForm';
import { quizService } from '../../services/quizService';

const CreateQuiz = () => {
  const navigate = useNavigate();

  const handleSubmit = async (quizData) => {
    try {
      await quizService.createQuiz(quizData);
      navigate('/admin/quizzes');
    } catch (error) {
      console.error('Failed to create quiz:', error);
      alert('Failed to create quiz');
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Quiz</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <QuizForm onSubmit={handleSubmit} onCancel={() => navigate('/admin/quizzes')} />
      </div>
    </div>
  );
};

export default CreateQuiz;
