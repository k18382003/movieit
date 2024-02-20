import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ProfileEditForm from './components/Profile/ProfileEdit/ProfileEditForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>{/* <Route path="/" element={<WelcomePage />} /> */}</Routes>
        <ProfileEditForm />
      </BrowserRouter>
    </>
  );
}

export default App;
