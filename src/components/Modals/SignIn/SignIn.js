import './SignIn.scss';
import brand from '../../../assets/images/MovieIt-black.svg';
import close from '../../../assets/icons/close.png';
import facebook from '../../../assets/icons/color_facebook.png';
import google from '../../../assets/icons/google.png';
import Button from '../../Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const { REACT_APP_API_BASE_PATH } = process.env;

const SignIn = ({ showModal }) => {
  const navigate = useNavigate();
  const [signInData, setsignInData] = useState({
    email: '',
    password: '',
  });
  const [errMsg, setErrMsg] = useState();

  const closeForm = () => {
    showModal();
  };

  const handleChange = (e) => {
    setsignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_PATH}/account/signin`,
        signInData
      );
      sessionStorage.setItem('JWTtoken', response.data.token);
      navigate('/profile/edit/1');
    } catch (error) {
      if (error.response?.status === 401) {
        setErrMsg('Password is not correct');
      } else if (error.response?.status === 400) {
        setErrMsg(`${error.response?.data?.message}`);
      } else {
        setErrMsg('System error! Please contact our techical support.');
        console.log(error);
      }
    }
  };

  return (
    <section className="sign-in">
      <div className="sign-in__top-container">
        <div className="sign-in__close">
          <img src={close} alt="Close Sign Up form" onClick={closeForm} />
        </div>
        <img className="sign-in__brand" src={brand} alt="MovieIt" />
      </div>
      <form className="sign-in__form" onSubmit={handleSignIn}>
        <input
          className="sign-in__input"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="sign-in__input"
          placeholder="password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button buttonText="SIGN IN" UniqueStyleClass={'sign-in__button'} />
      </form>
      {errMsg && <p className="error-msg">{errMsg}</p>}
      <div className="sign-in__alternative">
        <p className="sign-in__alternative-content">OR</p>
        <p className="sign-in__alternative-content">Sign in with</p>
        <div className="sign-in__alternative-icons">
          <img src={facebook} />
          <img src={google} />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
