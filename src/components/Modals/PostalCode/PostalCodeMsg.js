import Button from '../../Button/Button';
import './PostalCodeMsg.scss';

const PostalCodeMsg = ({ cinemaCode, homeCode }) => {
  return (
    <>
      <section className="msg-container">
        <div className="msg-container__top-container">
          <h1 className="msg-container__title">
            What group of individuals do you wish to invite with?
          </h1>
        </div>
        <div className="msg-container__button-container">
          <div>
            <p className="msg-container__button-label">Near Cinema</p>
            <Button
              buttonText={cinemaCode}
              UniqueStyleClass={'msg-container__button'}
            />
          </div>
          <div>
            <p className="msg-container__button-label">Near My Place</p>
            <Button
              buttonText={homeCode}
              UniqueStyleClass={'msg-container__button'}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PostalCodeMsg;
