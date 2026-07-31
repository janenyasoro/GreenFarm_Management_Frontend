// Route wrapper - blocks access to non-authenticated users
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-harvest-600"></div>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin - redirect to dashboard
  if (requireAdmin && user.role !== 'admin' && user.role !== 'owner') {
    return <Navigate to="/dashboard" replace />;
  }

  // All checks passed - render children
  return children;
};

export default ProtectedRoute;