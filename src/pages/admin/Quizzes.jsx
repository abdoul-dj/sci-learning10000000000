import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { getQuizzes, deleteQuiz } from "../../services/quizService.js";

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getQuizzes().then(setQuizzes).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this quiz?")) return;
    await deleteQuiz(id);
    load();
  };

  return (
    <AdminLayout title="Quizzes">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-500">Manage all quizzes and MCQ questions</p>
        <Link to="/admin/quizzes/create" className="flex items-center gap-2 bg-[#C4419F] text-white px-5 py-2.5 rounded-xl">
          <Plus size={18} /> Create Quiz
        </Link>
      </div>
      {loading ? <div className="text-center py-12">Loading...</div> : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Difficulty</th>
                <th className="text-left p-4">Questions</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="p-4">{q.title}</td>
                  <td className="p-4 text-[#C4419F]">{q.category}</td>
                  <td className="p-4">{q.difficulty}</td>
                  <td className="p-4">{q.question_count}</td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/quizzes/edit/${q.id}`} className="inline-flex p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(q.id)} className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
