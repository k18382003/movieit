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
import MessageList from './components/Message/MessageList';
import MessagePage from './pages/MessagePage/MessagePage';

function App() {
  const [showNavFooter, setShowNavFooter] = useState(true);

  return (
    <BrowserRouter>
      {showNavFooter && <Nav />}
      <main>
        <Routes>
          <Route
            path="/"
            element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
          />
          <Route path="/profile/:id" element={<ProfileCard />} />
          <Route path="/profile/edit" element={<ProfileEditForm />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/events/add" element={<EventCreate />} />
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/messages" element={<MessagePage />} />
        </Routes>
      </main>
      {showNavFooter && <Footer />}
    </BrowserRouter>
  );
}

export default App;
