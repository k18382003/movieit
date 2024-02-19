import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
