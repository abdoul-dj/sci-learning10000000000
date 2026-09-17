import { useEffect, useState } from "react";
import { Check, X, Eye } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import {
  getAllRequests, approveRequest, rejectRequest, checkEligibility, getAllCertificates,
} from "../../services/certificateService.js";

export default function AdminCertificates() {
  const [requests, setRequests] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [tab, setTab] = useState("requests");

  const load = () => {
    getAllRequests().then(setRequests);
    getAllCertificates().then(setCertificates);
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    try {
      await approveRequest(id, "Approved - meets 80% requirement");
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    const notes = prompt("Rejection reason:");
    if (!notes) return;
    await rejectRequest(id, notes);
    load();
  };

  const statusColor = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <AdminLayout title="Certificates">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab("requests")}
          className={`px-5 py-2 rounded-xl font-medium ${tab === "requests" ? "bg-[#C4419F] text-white" : "bg-white border"}`}>
          Requests ({requests.filter((r) => r.status === "Pending").length} pending)
        </button>
        <button onClick={() => setTab("issued")}
          className={`px-5 py-2 rounded-xl font-medium ${tab === "issued" ? "bg-[#C4419F] text-white" : "bg-white border"}`}>
          Issued Certificates
        </button>
      </div>

      {tab === "requests" ? (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Quiz/Lesson</th>
                <th className="text-left p-4">Submitted</th>
                <th className="text-left p-4">Verified</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="p-4">
                    <p className="font-medium">{req.full_name}</p>
                    <p className="text-sm text-gray-500">{req.email}</p>
                  </td>
                  <td className="p-4">{req.quiz_title || req.lesson_title || "—"}</td>
                  <td className="p-4">{req.submitted_marks ? `${req.submitted_marks}%` : "—"}</td>
                  <td className="p-4 font-semibold">{req.verified_score ? `${req.verified_score}%` : "—"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {req.status === "Pending" && (
                      <>
                        <button onClick={() => handleApprove(req.id)} className="inline-flex p-2 text-green-600 hover:bg-green-50 rounded-lg mr-1" title="Approve">
                          <Check size={18} />
                        </button>
                        <button onClick={() => handleReject(req.id)} className="inline-flex p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-500">{cert.full_name}</p>
              <p className="text-sm text-[#C4419F] mt-2">{cert.certificate_number}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(cert.issued_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
