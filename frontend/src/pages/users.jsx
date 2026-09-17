import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
  Copy,
  X,
} from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import {
  getUsers,
  getStats,
  createUser,
  updateUser,
  deleteUser as deleteUserApi,
} from "../services/userService.js";

const emptyForm = {
  full_name: "",
  email: "",
  password: "",
  role: "student",
  is_active: true,
};

const mapUser = (user) => {
  const name = String(user?.full_name || user?.name || "");
  const created = user?.created_at || user?.createdAt || null;
  return {
    ...user,
    id: user?.id || user?._id,
    full_name: name,
    name,
    email: user?.email || "",
    role: user?.role || "student",
    is_active: user?.is_active !== false,
    created_at: created,
    status: user?.is_active === false ? "Inactive" : "Active",
    date: created ? new Date(created).toLocaleDateString() : "—",
  };
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const rowsPerPage = 5;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [userData, statsData] = await Promise.all([
        getUsers(),
        getStats().catch(() => null),
      ]);
      const list = Array.isArray(userData) ? userData : [];
      setUsers(list.map(mapUser));
      setStats(statsData);
    } catch (err) {
      setError(err.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();
    return users.filter((user) => {
      const name = (user.name || "").toLowerCase();
      const email = (user.email || "").toLowerCase();
      const role = (user.role || "").toLowerCase();
      return name.includes(term) || email.includes(term) || role.includes(term);
    });
  }, [search, users]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortBy === "name") return String(a.name || "").localeCompare(String(b.name || ""));
      if (sortBy === "date") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      return 0;
    });
  }, [filteredUsers, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / rowsPerPage));

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sortedUsers.slice(start, start + rowsPerPage);
  }, [page, sortedUsers]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    setActionError("");
    try {
      await deleteUserApi(id);
      await load();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const toggleStatus = async (user) => {
    setActionError("");
    try {
      await updateUser(user.id, { is_active: user.status !== "Active" });
      await load();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const exportUsers = () => {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      setActionError("Could not copy email");
    }
  };

  const openCreate = () => {
    setForm(emptyForm);
    setShowCreate(true);
    setActionError("");
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      full_name: user.full_name,
      email: user.email,
      password: "",
      role: user.role,
      is_active: user.is_active !== false,
    });
    setActionError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setActionError("");
    try {
      if (showCreate) {
        await createUser({
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
        setShowCreate(false);
      } else if (editingUser) {
        const payload = {
          full_name: form.full_name,
          email: form.email,
          role: form.role,
          is_active: form.is_active,
        };
        if (form.password) payload.password = form.password;
        await updateUser(editingUser.id, payload);
        setEditingUser(null);
      }
      await load();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Users">
      <div className="bg-slate-50 p-2">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search Users..."
                className="pl-10 h-11 w-72 border rounded-xl bg-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 border rounded-xl px-3 bg-white"
            >
              <option value="name">Sort by name</option>
              <option value="date">Sort by date</option>
            </select>
            <button
              onClick={exportUsers}
              className="bg-slate-900 text-white px-4 rounded-xl"
              title="Export users"
            >
              <Download size={18} />
            </button>
            <button
              onClick={openCreate}
              className="bg-[#C4419F] text-white px-4 rounded-xl flex items-center gap-2"
            >
              <UserPlus size={18} /> Add User
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-xl">{error}</div>
        )}
        {actionError && (
          <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-xl">{actionError}</div>
        )}

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Total Users", value: stats?.totalUsers ?? users.length },
            {
              title: "Active Users",
              value:
                stats?.activeUsers ??
                users.filter((x) => x.status === "Active").length,
            },
            {
              title: "Inactive Users",
              value:
                stats?.inactiveUsers ??
                users.filter((x) => x.status === "Inactive").length,
            },
            { title: "New Users", value: stats?.newUsers ?? 0 },
          ].map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3>{card.title}</h3>
              <h1 className="text-4xl font-bold mt-4">{card.value}</h1>
            </motion.div>
          ))}
        </div>

        <div className="bg-white mt-8 rounded-2xl shadow-sm overflow-x-auto">
          <div className="p-6 border-b flex justify-between">
            <h2 className="text-xl font-semibold">Users List</h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading users...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id || user.email}
                      className="border-b"
                    >
                      <td className="p-4">{user.name}</td>
                      <td>{user.email}</td>
                      <td className="capitalize">{user.role}</td>
                      <td>
                        <button
                          onClick={() => toggleStatus(user)}
                          className={`px-3 py-1 rounded-full ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </button>
                      </td>
                      <td>{user.date}</td>
                      <td>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedUser(user)} title="View">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => openEdit(user)} title="Edit">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(user.id)} title="Delete">
                            <Trash2 size={18} />
                          </button>
                          <button onClick={() => copyEmail(user.email)} title="Copy email">
                            <Copy size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {!loading && paginatedUsers.length === 0 && (
            <p className="text-center text-gray-500 py-8">No users found.</p>
          )}

          <div className="flex justify-center items-center gap-3 p-6">
            <button onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
              <ChevronLeft />
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">User details</h3>
              <button onClick={() => setSelectedUser(null)}>
                <X size={20} />
              </button>
            </div>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p><strong>Joined:</strong> {selectedUser.date}</p>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full mt-4 border rounded-xl py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {(showCreate || editingUser) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {showCreate ? "Add User" : "Edit User"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowCreate(false);
                  setEditingUser(null);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Full name"
              className="w-full border rounded-xl p-3"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full border rounded-xl p-3"
              required
            />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={showCreate ? "Password" : "New password (optional)"}
              className="w-full border rounded-xl p-3"
              required={showCreate}
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded-xl p-3"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            {!showCreate && (
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                Active
              </label>
            )}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#C4419F] text-white rounded-xl py-3 disabled:opacity-50"
            >
              {saving ? "Saving..." : showCreate ? "Create User" : "Update User"}
            </button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
