import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonForm from '../../components/lessons/LessonForm';
import { lessonService } from '../../services/lessonService';

const CreateLesson = () => {
  const navigate = useNavigate();

  const handleSubmit = async (lessonData) => {
    try {
      await lessonService.createLesson(lessonData);
      navigate('/admin/lessons');
    } catch (error) {
      console.error('Failed to create lesson:', error);
      alert('Failed to create lesson');
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Lesson</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <LessonForm onSubmit={handleSubmit} onCancel={() => navigate('/admin/lessons')} />
      </div>
    </div>
  );
};

export default CreateLesson;
