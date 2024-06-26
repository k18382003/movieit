import { Link, useNavigate } from 'react-router-dom';
import close from '../../../assets/icons/close.png';
import Button from '../../Button/Button';
import './NavModal.scss';
import SearchBar from '../../SerachBar/SearchBar';
import { useContext, useState } from 'react';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import { refreshTokenContext } from '../../Security/RefreshTokenProvider';

const NavModal = ({ showModal, currentUser }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { token, setToken } = useContext(refreshTokenContext);
  const { stopTimer } = useContext(refreshTokenContext);

  const navigate = useNavigate();

  const closeNav = () => {
    showModal();
  };

  const showSignUpForm = () => {
    setShowSignUp(!showSignUp);
  };

  const showSignInFrom = () => {
    setShowSignIn(!showSignIn);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWTtoken');
    setToken(undefined);
    stopTimer();
    closeNav();
  };

  return (
    <>
      <section className="nav-modal">
        <div>
          <div className="nav-modal__close">
            <img src={close} alt="Close Navigation" onClick={closeNav} />
          </div>
          <ul className="nav-modal__list">
            <Link to={`/`} onClick={closeNav}>
              <li className="nav-modal__item">Home</li>
            </Link>
            {/* <Link>
              <li className="nav-modal__item">About</li>
            </Link>
            <Link>
              <li className="nav-modal__item">Contact</li>
            </Link> */}
            {token && currentUser && (
              <>
                <Link to={`profile/${currentUser?.userId}`} onClick={closeNav}>
                  <li className="nav-modal__item">Profile</li>
                </Link>
                <Link to={'events'} onClick={closeNav}>
                  <li className="nav-modal__item">Events</li>
                </Link>
                <Link to={'events/add'} onClick={closeNav}>
                  <li className="nav-modal__item">New Event</li>
                </Link>
                <Link>
                  <li className="nav-modal__item">Invitation</li>
                </Link>
              </>
            )}
          </ul>
          {/* {token && (
            <div className="nav-modal__search-bar">
              <SearchBar />
            </div>
          )} */}
        </div>
        {token ? (
          <Button
            buttonText="SIGN OUT"
            UniqueStyleClass={'nav-modal__button nav-modal__button--signup'}
            onClick={() => handleSignOut()}
          />
        ) : (
          <div className="nav-modal__button-container">
            <Button
              buttonText="SIGN UP"
              UniqueStyleClass={'nav-modal__button nav-modal__button--signup'}
              onClick={showSignUpForm}
            />
            <Button
              buttonText="SIGN IN"
              UniqueStyleClass={'nav-modal__button nav-modal__button--signin'}
              onClick={showSignInFrom}
            />
          </div>
        )}
      </section>
      {showSignUp && <SignUp showModal={setShowSignUp} />}
      {showSignIn && <SignIn showModal={showSignInFrom} />}
    </>
  );
};

export default NavModal;
