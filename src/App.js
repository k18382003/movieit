import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
const { REACT_APP_API_BASE_PATH } = process.env;

function App() {
  const [showNavFooter, setShowNavFooter] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowState = (show) => {
    setShowNavFooter(show);
  };

  const handleShowMessage = () => {
    setShowMessage(!showMessage);
  };

  return (
    <BrowserRouter>
      <RefreshTokenProvider>
        {showNavFooter && <Nav showMessage={handleShowMessage} />}
        <main>
          <Routes>
            <Route
              path="/"
              element={<WelcomePage setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/profile/:id"
              element={<ProfileCard setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/profile/event/:eventId/area/:code"
              element={<ProfileCardInvite setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/profile/edit"
              element={<ProfileEditForm setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/events"
              element={<EventList setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/events/:eventId"
              element={<EventDetail setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/events/add"
              element={<EventCreate setShowNavFooter={handleShowState} />}
            />
            <Route
              path="/myevents"
              element={<MyEvents setShowNavFooter={handleShowState} />}
            />
          </Routes>
          {showMessage && (
            <>
              <div className="overlay"></div>
              <InvitationList closeInvitation={setShowMessage} />
            </>
          )}
        </main>
        {showNavFooter && <Footer />}
      </RefreshTokenProvider>
    </BrowserRouter>
  );
}

export default App;
