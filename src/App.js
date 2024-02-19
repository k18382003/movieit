import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import NavModal from './components/Modals/Nav/NavModal';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavModal />
      </BrowserRouter>
    </>
  );
}

export default App;
