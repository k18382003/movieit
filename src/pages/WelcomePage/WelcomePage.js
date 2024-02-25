import { useEffect, useState } from 'react';
import './WelcomePage.scss';
import collapseNav from '../../assets/icons/collapse-nav.png';
import brand from '../../assets/images/MovieIt-white.svg';
import NavModal from '../../components/Modals/Nav/NavModal';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import SignIn from '../../components/Modals/SignIn/SignIn';
import SignUp from '../../components/Modals/SignUp/SignUp';
import axios from 'axios';
const { REACT_APP_API_BASE_PATH } = process.env;

const WelcomePage = ({ setShowNavFooter, currentUser}) => {
  const [show, setShow] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('JWTtoken'));


  useEffect(() => {
    setShowNavFooter(false);
  }, []);

  const showModal = () => {
    setShow(!show);
  };
  const showSignInForm = () => {
    setShowSignIn(!showSignIn);
  };
  const showSignUpForm = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSignOut = () => {
    localStorage.removeItem('JWTtoken');
    setToken(undefined);
  };


  return (
    <>
      <section className="welcome-mobile">
        <div className="welcome-mobile__overlay"></div>
        <img
          className="welcome-mobile__collapse"
          alt="Show Navigation"
          src={collapseNav}
          onClick={showModal}
        />
        <div className="welcome-mobile__signing-container">
          <div className="welcome-mobile__signing-inner-container welcome-mobile__signing-inner-container--brand">
            <img src={brand} />
          </div>
          {!token && (
            <div className="welcome-mobile__signing-inner-container welcome-mobile__signing-inner-container--button">
              <Button
                buttonText="SIGN UP"
                UniqueStyleClass={
                  'welcome-mobile__button welcome-mobile__button--signup'
                }
                onClick={setShowSignUp}
              />
              <Button
                buttonText="SIGN IN"
                UniqueStyleClass={
                  'welcome-mobile__button welcome-mobile__button--signin'
                }
                onClick={setShowSignIn}
              />
            </div>
          )}
        </div>
      </section>
      <section className="welcome-tablet">
        <div className="welcome-tablet__ovelay">
          <div className="welcome-tablet__nav-container">
            <div className="welcome-tablet__brand-list">
              <img
                src={brand}
                alt="MovieIt"
                className="welcome-tablet__nav-brand"
              />
              <ul className="welcome-tablet__nav-list">
                {/* <Link>
                  <li className="welcome-tablet__nav-item">About</li>
                </Link>
                <Link>
                  <li className="welcome-tablet__nav-item">Contact</li>
                </Link> */}
                {token && (
                  <>
                    <Link to={`/profile/${currentUser?.userId}`}>
                      <li className="welcome-tablet__nav-item">Profile</li>
                    </Link>
                    <Link to={`/events`}>
                      <li className="welcome-tablet__nav-item">Events</li>
                    </Link>
                    <Link>
                      <li className="welcome-tablet__nav-item">Message</li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
            {token ? (
              <Button
                buttonText={'SING OUT'}
                UniqueStyleClass={'welcome-tablet__signout-button'}
                onClick={handleSignOut}
              />
            ) : (
              <Button
                buttonText={'SING IN'}
                UniqueStyleClass={'welcome-tablet__signin-button'}
                onClick={setShowSignIn}
              />
            )}
          </div>
        </div>
        <div className="welcome-tablet__title-container">
          <h1 className="welcome-tablet__title">Let's Movie It</h1>
          {!token && (
            <Button
              buttonText={'SIGN UP'}
              UniqueStyleClass={'welcome-tablet__signup-button'}
              onClick={setShowSignUp}
            />
          )}
        </div>
      </section>
      {show && <NavModal showModal={showModal} currentUser={currentUser}/>}
      {showSignIn && <SignIn showModal={showSignInForm} />}
      {showSignUp && (
        <SignUp showModal={showSignUpForm} showSignIn={setShowSignIn} />
      )}
    </>
  );
};

export default WelcomePage;
