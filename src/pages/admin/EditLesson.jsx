import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getLesson, updateLesson, getCategories } from "../../services/lessonService.js";

export default function AdminEditLesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", category_id: "", content: "", image_url: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getLesson(id).then((lesson) => {
      setForm({
        title: lesson.title,
        description: lesson.description,
        category_id: lesson.category_id,
        content: lesson.content,
        image_url: lesson.image_url || "",
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateLesson(id, { ...form, category_id: form.category_id });
      navigate("/admin/lessons");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Edit Lesson">
      <form onSubmit={handleSubmit} className="max-w-3xl bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-[#C4419F]" required />
        </div>
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-[#C4419F] h-24" required />
        </div>
        <div>
          <label className="block font-medium mb-2">Category</label>
          <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-[#C4419F]" required>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-2">Lesson Content (HTML)</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-[#C4419F] h-48 font-mono text-sm" required />
        </div>
        <div>
          <label className="block font-medium mb-2">Image URL</label>
          <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-[#C4419F]" />
        </div>
        <button type="submit" disabled={saving}
          className="bg-[#C4419F] text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50">
          {saving ? "Saving..." : "Update Lesson"}
        </button>
      </form>
    </AdminLayout>
  );
}
