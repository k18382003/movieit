import facebook from '../../assets/icons/facebook.png';
import twitter from '../../assets/icons/twitter.png';
import instagram from '../../assets/icons/instagram.png';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Social</h2>
        <div className="footer__socials">
          <img alt="facebook" src={facebook} />
          <img alt="instagram" src={instagram} />
          <img alt="twitter" src={twitter} />
        </div>
      </div>
      <div className="footer__container">
        <h2 className="footer__title">Contact</h2>
        <p className="footer__content">info@movieit.com</p>
      </div>
      <div className="footer_container">
        <h2 className="footer__title">Hours</h2>
        <div className="footer__content">
          <span className="footer__content--time">Monday - Friday</span>
          <span className="footer__content--time">9:00 AM - 5:00 PM</span>
        </div>
        <div className="footer__content">
          <span className="footer__content--time">Weekends</span>
          <span className="footer__content--time">closed</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
