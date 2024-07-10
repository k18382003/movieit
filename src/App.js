import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import InvitationList from './components/Modals/Invitation/InvitationList';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      <ToastContainer />
      {location.pathname === '/' ? (
        <WelcomePage />
      ) : (
        <>
          <Nav showMessage={setShowMessage} />
          <Outlet />
          {showMessage && (
            <>
              <div className="overlay"></div>
              <InvitationList closeInvitation={setShowMessage} />
            </>
          )}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
