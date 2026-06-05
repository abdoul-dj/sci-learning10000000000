import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonForm from '../../components/lessons/LessonForm';
import { lessonService } from '../../services/lessonService';
import Loader from '../../components/common/Loader';

const EditLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, [id]);

  const fetchLesson = async () => {
    try {
      const data = await lessonService.getLessonById(id);
      setLesson(data);
    } catch (error) {
      console.error('Failed to fetch lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (lessonData) => {
    try {
      await lessonService.updateLesson(id, lessonData);
      navigate('/admin/lessons');
    } catch (error) {
      console.error('Failed to update lesson:', error);
      alert('Failed to update lesson');
    }
  };

  if (loading) return <Loader />;
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Lesson</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <LessonForm lesson={lesson} onSubmit={handleSubmit} onCancel={() => navigate('/admin/lessons')} />
      </div>
    </div>
  );
};

export default EditLesson;
