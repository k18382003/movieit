import { useState } from 'react';
import './WelcomePage.scss';
import collapseNav from '../../assets/icons/collapse-nav.png';
import brand from '../../assets/images/MovieIt-white.svg';
import NavModal from '../../components/Modals/Nav/NavModal';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(!show);
  };

  return (
    <>
      <main className="welcome-mobile">
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
          <div className="welcome-mobile__signing-inner-container welcome-mobile__signing-inner-container--button">
            <Button
              buttonText="SIGN UP"
              UniqueStyleClass={
                'welcome-mobile__button welcome-mobile__button--signup'
              }
            />
            <Button
              buttonText="SIGN IN"
              UniqueStyleClass={
                'welcome-mobile__button welcome-mobile__button--signin'
              }
            />
          </div>
        </div>
      </main>
      <main className="welcome-tablet">
        <div className="welcome-tablet__ovelay">
          <div className="welcome-tablet__nav-container">
            <div className="welcome-tablet__brand-list">
              <img
                src={brand}
                alt="MovieIt"
                className="welcome-tablet__nav-brand"
              />
              <ul className="welcome-tablet__nav-list">
                <Link>
                  <li className="welcome-tablet__nav-item">About</li>
                </Link>
                <Link>
                  <li className="welcome-tablet__nav-item">Contact</li>
                </Link>
              </ul>
            </div>
            <Button
              buttonText={'SING IN'}
              UniqueStyleClass={'welcome-tablet__signin-button'}
            />
          </div>
        </div>
        <div className="welcome-tablet__title-container">
          <h1 className="welcome-tablet__title">Let's Movie It</h1>
          <Button buttonText={'SIGN UP'} UniqueStyleClass={'welcome-tablet__signup-button'} />
        </div>
      </main>
      {show && <NavModal showModal={showModal} />}
    </>
  );
};

export default WelcomePage;