import './App.scss';
import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfileEditForm from './components/Profile/ProfileEdit/ProfileEditForm';
import ProfileCard from './components/Profile/ProfileCard';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import EventList from './components/Events/EventList';
import MyEvents from './components/Events/MyEvent';
import 'react-calendar/dist/Calendar.css';
import EventDetail from './components/Events/EventDetails';
import EventCreate from './components/Events/EventCreate';
import ProfileCardInvite from './components/Profile/ProfileCardInvite';
import InvitationList from './components/Modals/Invitation/InvitationList';
import { RefreshTokenProvider } from './components/Security/RefreshTokenProvider';
import { ToastContainer } from 'react-toastify';
const { REACT_APP_API_BASE_PATH } = process.env;

function App() {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);
    const handleShowMessage = () => {
      setShowMessage(!showMessage);
    };

  return (
    <>
      {location.pathname == '/' ? (
        <WelcomePage />
      ) : (
        <>
          <Nav showMessage={handleShowMessage} />
          <Outlet />
          {showMessage && (
            <>
              <div className="overlay"></div>
              <InvitationList closeInvitation={setShowMessage} />
            </>
          )}
          <ToastContainer />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
