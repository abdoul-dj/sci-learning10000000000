import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getTips, createTip, updateTip, deleteTip } from "../../services/tipService.js";
import { getCategories } from "../../services/lessonService.js";

export default function AdminTips() {
  const [tips, setTips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", category_id: "", read_time: "3 min read" });

  const load = () => getTips().then(setTips);
  useEffect(() => { load(); getCategories().then(setCategories); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", content: "", category_id: "", read_time: "3 min read" });
    setShowForm(true);
  };

  const openEdit = (tip) => {
    setEditing(tip.id);
    setForm({ title: tip.title, content: tip.content, category_id: tip.category_id, read_time: tip.read_time });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, category_id: form.category_id };
    if (editing) await updateTip(editing, data);
    else await createTip(data);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this tip?")) return;
    await deleteTip(id);
    load();
  };

  return (
    <AdminLayout title="Tips">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Manage educational tips</p>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#C4419F] text-white px-5 py-2.5 rounded-xl">
          <Plus size={18} /> Add Tip
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{editing ? "Edit Tip" : "Add Tip"}</h3>
              <button type="button" onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full border rounded-xl p-3" required />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Content" className="w-full border rounded-xl p-3 h-32" required />
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="w-full border rounded-xl p-3" required>
              <option value="">Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button type="submit" className="bg-[#C4419F] text-white px-6 py-3 rounded-xl w-full">{editing ? "Update" : "Create"}</button>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl border p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{tip.title}</h3>
                <span className="text-sm text-[#C4419F]">{tip.category}</span>
                <p className="text-gray-500 mt-2 text-sm line-clamp-2">{tip.content}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(tip)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                <button onClick={() => handleDelete(tip.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
