import brand from '../../assets/images/MovieIt-white.svg';
import collapseNav from '../../assets/icons/collapse-nav.png';
import './Nav.scss';
import { useState } from 'react';
import NavModal from '../Modals/Nav/NavModal';
import { Link } from 'react-router-dom';
import SearchBar from '../SerachBar/SearchBar';

const Nav = () => {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(!show);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__brand-list">
          <img className="nav__brand" src={brand} alt="MovieIt" />
          <ul className="nav__list">
            <Link>
              <li className="nav__item">Home</li>
            </Link>
            <Link>
              <li className="nav__item">About</li>
            </Link>
            <Link>
              <li className="nav__item">Contact</li>
            </Link>
            <Link>
              <li className="nav__item">Profile</li>
            </Link>
            <Link>
              <li className="nav__item">Message</li>
            </Link>
          </ul>
        </div>
        <div className="nav__search-bar">
          <SearchBar />
        </div>
        <img
          className="nav__collapse"
          alt="Show Navigation"
          src={collapseNav}
          onClick={showModal}
        />
      </nav>
      {show && <NavModal showModal={showModal} />}
    </>
  );
};

export default Nav;
