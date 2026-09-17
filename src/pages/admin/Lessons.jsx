import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getLessons, deleteLesson } from "../../services/lessonService.js";

export default function AdminLessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getLessons()
      .then(setLessons)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this lesson?")) return;
    await deleteLesson(id);
    load();
  };

  return (
    <AdminLayout title="Lessons">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Manage all lessons</p>
        <Link
          to="/admin/lessons/create"
          className="flex items-center gap-2 bg-[#C4419F] text-white px-5 py-2.5 rounded-xl hover:opacity-90"
        >
          <Plus size={18} /> Add Lesson
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">Title</th>
                <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                <th className="text-right p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-t border-gray-100">
                  <td className="p-4">{lesson.title}</td>
                  <td className="p-4 text-[#C4419F]">{lesson.category}</td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/lessons/edit/${lesson.id}`}
                      className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
