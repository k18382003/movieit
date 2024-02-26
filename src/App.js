import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfileEditForm from './components/Profile/ProfileEdit/ProfileEditForm';
import ProfileCard from './components/Profile/ProfileCard';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import EventList from './components/Events/EventList';
import MyEvents from './components/Events/MyEvent';
import 'react-calendar/dist/Calendar.css';
import EventDetail from './components/Events/EventDetails';
import EventCreate from './components/Events/EventCreate';
import axios from 'axios';
import PostalCodeMsg from './components/Modals/PostalCode/PostalCodeMsg';
import ProfileCardInvite from './components/Profile/ProfileCardInvite';
const { REACT_APP_API_BASE_PATH } = process.env;

function App() {
  const [showNavFooter, setShowNavFooter] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState(localStorage.getItem('JWTtoken'));
  const handleShowState = (show) => {
    setShowNavFooter(show);
  };

  useEffect(() => {
    if (!token) return;
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/account/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, [token]);

  return (
    <BrowserRouter>
      {showNavFooter && <Nav currentUser={currentUser} />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <WelcomePage
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProfileCard
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/profile/event/:eventId/area/:code"
            element={
              <ProfileCardInvite
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProfileEditForm
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/events"
            element={
              <EventList
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <EventDetail
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/events/add"
            element={
              <EventCreate
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/myevents"
            element={
              <MyEvents
                setShowNavFooter={handleShowState}
                currentUser={currentUser}
              />
            }
          />
          {/* <Route path="/messages" element={<MessagePage />} /> */}
        </Routes>
      </main>
      {showNavFooter && <Footer />}
    </BrowserRouter>
  );
}

export default App;
