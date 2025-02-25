import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_PERMISSIONS } from '../../constants/roles';

export default function PrivateRoute({ children, requiredPermissions = [] }) {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If no specific permissions are required, allow access
  if (requiredPermissions.length === 0) {
    return children;
  }

  // Check if user's role has all required permissions
  const hasPermissions = requiredPermissions.every(permission =>
    ROLE_PERMISSIONS[userRole]?.includes(permission)
  );

  if (!hasPermissions) {
    return <Navigate to="/dashboard" />;
  }

  return children;
} 