import { useContext } from 'react';
import { refreshTokenContext } from './RefreshTokenProvider';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequireAuth = () => {
  const { token } = useContext(refreshTokenContext);
  const location = useLocation();
  if (!token) {
    toast.error('Unauthorized. Please sign in.', {
      position: 'top-center',
    });
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
