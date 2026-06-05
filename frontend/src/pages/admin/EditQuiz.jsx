import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizForm from '../../components/quizzes/QuizForm';
import { quizService } from '../../services/quizService';
import Loader from '../../components/common/Loader';

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const data = await quizService.getQuizById(id);
      setQuiz(data);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (quizData) => {
    try {
      await quizService.updateQuiz(id, quizData);
      navigate('/admin/quizzes');
    } catch (error) {
      console.error('Failed to update quiz:', error);
      alert('Failed to update quiz');
    }
  };

  if (loading) return <Loader />;
  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Quiz</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <QuizForm quiz={quiz} onSubmit={handleSubmit} onCancel={() => navigate('/admin/quizzes')} />
      </div>
    </div>
  );
};

export default EditQuiz;
