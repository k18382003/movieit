import { Link } from 'react-router-dom';
import close from '../../../assets/icons/close.png';
import search from '../../../assets/icons/search.png';
import Button from '../../Button/Button';
import './NavModal.scss';
import SearchBar from '../../SerachBar/SearchBar';

const NavModal = ({ showModal }) => {
  const closeNav = () => {
    showModal();
  };

  return (
    <section className="nav-modal">
      <div>
        <div className="nav-modal__close">
          <img src={close} alt="Close Navigation" onClick={closeNav} />
        </div>
        <ul className="nav-modal__list">
          <Link>
            <li className="nav-modal__item">Home</li>
          </Link>
          <Link>
            <li className="nav-modal__item">About</li>
          </Link>
          <Link>
            <li className="nav-modal__item">Contact</li>
          </Link>
          <Link>
            <li className="nav-modal__item">Profile</li>
          </Link>
          <Link>
            <li className="nav-modal__item">Message</li>
          </Link>
        </ul>
        <div className="nav-modal__search-bar">
          <SearchBar />
        </div>
      </div>
      <div className="nav-modal__button-container">
        <Button
          buttonText="SIGN UP"
          UniqueStyleClass={'nav-modal__button nav-modal__button--signup'}
        />
        <Button
          buttonText="SIGN IN"
          UniqueStyleClass={'nav-modal__button nav-modal__button--signin'}
        />
      </div>
    </section>
  );
};

export default NavModal;
