import './SignUp.scss';
import brand from '../../../assets/images/MovieIt-black.svg';
import close from '../../../assets/icons/close.png';
import facebook from '../../../assets/icons/color_facebook.png';
import google from '../../../assets/icons/google.png';
import Button from '../../Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const { REACT_APP_API_BASE_PATH } = process.env;

const SignUp = ({ showModal, showSignIn }) => {
  const [signUpData, setsignUpData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();

  const closeForm = () => {
    showModal();
  };

  const handleChange = (e) => {
    setsignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_PATH}/account/signup`,
        signUpData
      );
      closeForm();
      showSignIn(true);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg(`${error.response?.data?.message}`);
      } else {
        setErrMsg('System error! Please contact our techical support.');
        console.log(error);
      }
    }
  };

  return (
    <section className="sign-up">
      <div className="sign-up__top-container">
        <div className="sign-up__close">
          <img src={close} alt="Close Sign Up form" onClick={closeForm} />
        </div>
        <img className="sign-up__brand" src={brand} alt="MovieIt" />
      </div>
      <form className="sign-up__form" onSubmit={handleSignUp}>
        <input
          className="sign-up__input"
          placeholder="username"
          name="username"
          onChange={handleChange}
          autocomplete="off"
        />
        <input
          className="sign-up__input"
          placeholder="email"
          name="email"
          onChange={handleChange}
          autocomplete="off"
        />
        <input
          className="sign-up__input"
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChange}
          autocomplete="off"
        />
        <Button buttonText="SIGN UP" UniqueStyleClass={'sign-up__button'} />
      </form>
      {errMsg && <p className="error-msg">{errMsg}</p>}
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
