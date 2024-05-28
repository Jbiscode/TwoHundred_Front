import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@zustand/authStore';


function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  const refreshToken = useAuthStore((state) => state.refreshToken);


  useEffect(() => {
    if (!token) {
      refreshToken();
    }
  }, [token, refreshToken]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;