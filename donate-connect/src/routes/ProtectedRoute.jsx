import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useAppContext();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
