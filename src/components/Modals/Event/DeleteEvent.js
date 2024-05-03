import { useNavigate } from 'react-router';
import Button from '../../Button/Button';
import './DeleteEvent.scss';
import axios from 'axios';
import { refreshTokenContext } from '../../Security/RefreshTokenProvider';
import { useContext } from 'react';
const { REACT_APP_API_BASE_PATH } = process.env;

const DeleteEvent = ({ showModal, eventId }) => {
  const navigate = useNavigate();
  const { token } = useContext(refreshTokenContext);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_BASE_PATH}/events/${eventId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="delete-container">
        <div className="delete-container__top-container">
          <h1 className="delete-container__title">
            Are you sure you want to cancel the event?
          </h1>
        </div>
        <div className="delete-container__button-container">
          <div>
            <Button
              buttonText={'Yes'}
              UniqueStyleClass={'delete-container__button'}
              onClick={handleDelete}
            />
          </div>
          <div>
            <Button
              buttonText={'No'}
              UniqueStyleClass={'delete-container__button'}
              onClick={() => showModal(false)}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteEvent;
