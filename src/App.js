import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfileEditForm from './components/Profile/ProfileEdit/ProfileEditForm';
import ProfileCard from './components/Profile/ProfileCard';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { useState } from 'react';

function App() {
  const [showNavFooter, setShowNavFooter] = useState(true);

  return (
    <>
      <BrowserRouter>
        {showNavFooter && <Nav />}
        <Routes>
          <Route
            path="/"
            element={<WelcomePage setShowNavFooter={setShowNavFooter} />}
          />
          <Route path="/profile/:id" element={<ProfileCard />} />
          <Route path="/profile/edit" element={<ProfileEditForm />} />
        </Routes>
        {showNavFooter && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
