import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
const { REACT_APP_API_BASE_PATH } = process.env;

// Step 1: Create a Context
export const refreshTokenContext = createContext();

// Step 2: Create a Context Provider
export const RefreshTokenProvider = ({ children }) => {
  const [expiryTime, setExpiryTime] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeoutId, setTimeOutId] = useState(null);
  const [reminderId, setReminderId] = useState(null);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (expiryTime) {
      const timeout = setTimeout(() => {
        localStorage.removeItem('JWTtoken');
        navigate('/');
        toast.warning('Session expired. Please log in again', {
          position: 'top-center',
          autoClose: false,
        });
        stopTimer();
      }, Math.floor(expiryTime.getTime() - Date.now()));

      const reminderTimeout = setTimeout(() => {
        console.log('Token expires in 30 seconds!');
        refreshToken();
      }, Math.floor(expiryTime.getTime() - Date.now() - 30 * 1000));

      setTimeOutId(timeout);
      setReminderId(reminderTimeout);
      return () => {
        clearTimeout(timeout);
        clearTimeout(reminderTimeout);
      };
    }
  }, [expiryTime]);

  const stopTimer = () => {
    clearTimeout(timeoutId);
    clearTimeout(reminderId);
  };

  const refreshToken = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${REACT_APP_API_BASE_PATH}/account/refreshtoken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem('JWTtoken', response.data.token);
      setToken(response.data.token);
      var _token = JSON.parse(atob(response.data.token?.split('.')[1]));
      setExpiryTime(new Date(_token.exp * 1000));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Step 2: Provide Context Values
    <refreshTokenContext.Provider
      value={{ timer, setTimer, setExpiryTime, stopTimer, token, setToken }}
    >
      {children}
    </refreshTokenContext.Provider>
  );
};
