import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getQuizAdmin, updateQuiz } from "../../services/quizService.js";
import { getCategories } from "../../services/lessonService.js";

const emptyQuestion = () => ({
  question_text: "", explanation: "",
  options: [
    { option_text: "", is_correct: true },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ],
});

export default function AdminEditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getQuizAdmin(id).then((quiz) => {
      setForm({
        title: quiz.title,
        description: quiz.description || "",
        category_id: quiz.category_id,
        difficulty: quiz.difficulty,
        duration_minutes: quiz.duration_minutes,
        questions: quiz.questions.map((q) => ({
          question_text: q.question_text,
          explanation: q.explanation || "",
          options: q.options.map((o) => ({ option_text: o.option_text, is_correct: o.is_correct })),
        })),
      });
    });
  }, [id]);

  if (!form) return <AdminLayout title="Edit Quiz"><div>Loading...</div></AdminLayout>;

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
      await updateQuiz(id, { ...form, category_id: form.category_id });
      navigate("/admin/quizzes");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Edit Quiz">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded-xl p-3" required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-xl p-3 h-20" />
          <div className="grid grid-cols-3 gap-4">
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="border rounded-xl p-3" required>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="border rounded-xl p-3">
              <option value="Easy">Easy</option><option value="Medium">Medium</option><option value="Hard">Hard</option>
            </select>
            <input type="number" value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) })} className="border rounded-xl p-3" />
          </div>
        </div>
        {form.questions.map((q, qIdx) => (
          <div key={qIdx} className="bg-white rounded-xl border p-6 space-y-4">
            <h3 className="font-semibold text-[#C4419F]">Question {qIdx + 1}</h3>
            <input value={q.question_text} onChange={(e) => updateQuestion(qIdx, "question_text", e.target.value)} className="w-full border rounded-xl p-3" required />
            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-3">
                <input type="radio" checked={opt.is_correct} onChange={() => updateOption(qIdx, oIdx, "is_correct", true)} />
                <input value={opt.option_text} onChange={(e) => updateOption(qIdx, oIdx, "option_text", e.target.value)} className="flex-1 border rounded-xl p-3" required />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={() => setForm({ ...form, questions: [...form.questions, emptyQuestion()] })} className="flex items-center gap-2 text-[#C4419F]"><Plus size={18} /> Add Question</button>
        <button type="submit" disabled={saving} className="bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold">{saving ? "Saving..." : "Update Quiz"}</button>
      </form>
    </AdminLayout>
  );
}
