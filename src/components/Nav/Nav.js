import brand from '../../assets/images/MovieIt-white.svg';
import collapseNav from '../../assets/icons/collapse-nav.png';
import './Nav.scss';
import { useState } from 'react';
import NavModal from '../Modals/Nav/NavModal';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SerachBar/SearchBar';

const Nav = ({ currentUser }) => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('JWTtoken'));

  const navigate = useNavigate();

  const showModal = () => {
    setShow(!show);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWTtoken');
    setToken(undefined);
    navigate('/');
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__brand-list">
          <img className="nav__brand" src={brand} alt="MovieIt" />
          <ul className="nav__list">
            <Link to="/">
              <li className="nav__item">Home</li>
            </Link>
            {/* <Link>
              <li className="nav__item">About</li>
            </Link>
            <Link>
              <li className="nav__item">Contact</li>
            </Link> */}
            {token && (
              <>
                <Link to={`/profile/${currentUser?.userId}`}>
                  <li className="nav__item">Profile</li>
                </Link>
                <Link to={`/events`}>
                  <li className="nav__item">Events</li>
                </Link>
                <Link>
                  <li className="nav__item">Message</li>
                </Link>
              </>
            )}
          </ul>
        </div>
        {token && (
          <>
            {/* <div className="nav__search-bar">
              <SearchBar />
            </div> */}
            <p className="nav__item nav__item--signout" onClick={handleSignOut}>
              Sign Out
            </p>
          </>
        )}
        <img
          className="nav__collapse"
          alt="Show Navigation"
          src={collapseNav}
          onClick={showModal}
        />
      </nav>
      {show && <NavModal showModal={showModal} currentUser={currentUser} />}
    </>
  );
};

export default Nav;
