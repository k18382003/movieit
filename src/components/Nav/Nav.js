import brand from '../../assets/images/MovieIt-white.svg';
import collapseNav from '../../assets/icons/collapse-nav.png';
import './Nav.scss';
import { useContext, useEffect, useState } from 'react';
import NavModal from '../Modals/Nav/NavModal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { refreshTokenContext } from '../Security/RefreshTokenProvider';

const Nav = ({ showMessage }) => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [unreadMsg, setUnreadMsg] = useState(0);
  const { REACT_APP_API_BASE_PATH } = process.env;
  const { stopTimer, setToken, token } = useContext(refreshTokenContext);

  const navigate = useNavigate();

  const showModal = () => {
    setShow(!show);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWTtoken');
    setToken(undefined);
    stopTimer();
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      const fetchingUnreadMessge = async () => {
        try {
          const response = await axios.get(
            `${REACT_APP_API_BASE_PATH}/invitation/unread/${currentUser?.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUnreadMsg(response.data.length || 0);
        } catch (error) {
          console.error(error);
        }
      };
      fetchingUnreadMessge();
    }
  }, [token, currentUser]);

  useEffect(() => {
    if (token) {
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
    }
  }, [token]);

  const UpdateRead = async () => {
    try {
      await axios.patch(
        `${REACT_APP_API_BASE_PATH}/invitation/${currentUser?.userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showMessage(true);
      setUnreadMsg(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__brand-list">
          <Link to="/">
            <img className="nav__brand" src={brand} alt="MovieIt" />
          </Link>
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
                <Link to={`/events/add`}>
                  <li className="nav__item">New Event</li>
                </Link>
                <div className="nav__message-link" onClick={() => UpdateRead()}>
                  {unreadMsg !== 0 && (
                    <p className="nav__messages">{unreadMsg}</p>
                  )}
                  <li className="nav__item">Invitation</li>
                </div>
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
