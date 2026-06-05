import React from 'react';

const QuestionForm = ({ question, index, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, field, value);
  };

  const handleOptionChange = (optionIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    onChange(index, 'options', newOptions);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">Question {index + 1}</span>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      <textarea
        value={question.question}
        onChange={(e) => handleChange('question', e.target.value)}
        placeholder="Enter your question"
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
        required
      />

      <div className="space-y-2 mb-3">
        {question.options.map((option, oIndex) => (
          <div key={oIndex} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`correct-${index}`}
              checked={question.correctAnswer === oIndex}
              onChange={() => handleChange('correctAnswer', oIndex)}
              className="h-4 w-4 text-purple-600"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-700">Points:</label>
        <input
          type="number"
          value={question.points}
          onChange={(e) => handleChange('points', parseInt(e.target.value))}
          min="1"
          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
          required
        />
      </div>
    </div>
  );
};

export default QuestionForm;
