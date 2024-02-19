import './SignUp.scss';
import brand from '../../../assets/images/MovieIt-black.svg';
import close from '../../../assets/icons/close.png';
import facebook from '../../../assets/icons/color_facebook.png';
import google from '../../../assets/icons/google.png';
import Button from '../../Button/Button';

const SignUp = ({ showModal }) => {
  const closeForm = () => {
    showModal();
  };

  return (
    <section className="sign-up">
      <div className="sign-up__top-container">
        <div className="sign-up__close">
          <img src={close} alt="Close Sign Up form" onClick={closeForm} />
        </div>
        <img className="sign-up__brand" src={brand} alt="MovieIt" />
      </div>
      <form className="sign-up__form">
        <input className="sign-up__input" placeholder="username" />
        <input className="sign-up__input" placeholder="email" />
        <input
          className="sign-up__input"
          placeholder="password"
          type="password"
        />
        <Button buttonText="SIGN UP" UniqueStyleClass={'sign-up__button'} />
      </form>
      <div className="sign-up__alternative">
        <p className="sign-up__alternative-content">OR</p>
        <p className="sign-up__alternative-content">Sign up with</p>
        <div className="sign-up__alternative-icons">
          <img src={facebook} />
          <img src={google} />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
