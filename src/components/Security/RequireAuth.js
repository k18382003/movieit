import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { refreshTokenContext } from './RefreshTokenProvider';
import { toast } from 'react-toastify';

const RequireAuth = () => {
  const { token } = useContext(refreshTokenContext);

  if (!token) {
    toast.error('Please sign in first!', {
      position: 'top-center',
    });
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RequireAuth;
