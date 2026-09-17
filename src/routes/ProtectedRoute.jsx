import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C4419F] border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}
