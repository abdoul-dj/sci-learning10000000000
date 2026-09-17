import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { createQuiz } from "../../services/quizService.js";
import { getCategories } from "../../services/lessonService.js";

const emptyQuestion = () => ({
  question_text: "",
  explanation: "",
  options: [
    { option_text: "", is_correct: true },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ],
});

export default function AdminCreateQuiz() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", category_id: "", difficulty: "Easy", duration_minutes: 30,
    questions: [emptyQuestion()],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => { getCategories().then(setCategories); }, []);

  const updateQuestion = (idx, field, value) => {
    const questions = [...form.questions];
    questions[idx] = { ...questions[idx], [field]: value };
    setForm({ ...form, questions });
  };

  const updateOption = (qIdx, oIdx, field, value) => {
    const questions = [...form.questions];
    const options = [...questions[qIdx].options];
    if (field === "is_correct") {
      options.forEach((o, i) => { options[i] = { ...o, is_correct: i === oIdx }; });
    } else {
      options[oIdx] = { ...options[oIdx], [field]: value };
    }
    questions[qIdx] = { ...questions[qIdx], options };
    setForm({ ...form, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createQuiz({ ...form, category_id: form.category_id });
      navigate("/admin/quizzes");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Create Quiz">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Quiz Title" className="w-full border rounded-xl p-3" required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description" className="w-full border rounded-xl p-3 h-20" />
          <div className="grid grid-cols-3 gap-4">
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="border rounded-xl p-3" required>
              <option value="">Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className="border rounded-xl p-3">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input type="number" value={form.duration_minutes}
              onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) })}
              placeholder="Duration (min)" className="border rounded-xl p-3" />
          </div>
        </div>

        {form.questions.map((q, qIdx) => (
          <div key={qIdx} className="bg-white rounded-xl border p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[#C4419F]">Question {qIdx + 1}</h3>
              {form.questions.length > 1 && (
                <button type="button" onClick={() => {
                  setForm({ ...form, questions: form.questions.filter((_, i) => i !== qIdx) });
                }} className="text-red-500"><Trash2 size={18} /></button>
              )}
            </div>
            <input value={q.question_text} onChange={(e) => updateQuestion(qIdx, "question_text", e.target.value)}
              placeholder="Question text" className="w-full border rounded-xl p-3" required />
            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-3">
                <input type="radio" checked={opt.is_correct}
                  onChange={() => updateOption(qIdx, oIdx, "is_correct", true)} />
                <input value={opt.option_text} onChange={(e) => updateOption(qIdx, oIdx, "option_text", e.target.value)}
                  placeholder={`Option ${oIdx + 1}`} className="flex-1 border rounded-xl p-3" required />
              </div>
            ))}
          </div>
        ))}

        <button type="button" onClick={() => setForm({ ...form, questions: [...form.questions, emptyQuestion()] })}
          className="flex items-center gap-2 text-[#C4419F] font-medium">
          <Plus size={18} /> Add Question
        </button>

        <button type="submit" disabled={saving}
          className="bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold">
          {saving ? "Saving..." : "Create Quiz"}
        </button>
      </form>
    </AdminLayout>
  );
}
