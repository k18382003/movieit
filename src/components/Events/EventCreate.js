import ProfilePhotoUpload from '../Profile/ProfileEdit/ProfilePhotoUpload';
import Button from '../Button/Button';
import './EventCreate.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { formatingDateTimeString } from '../../utils/formatingDateTimeString';
import UploadPhotoWidget from '../photoWidget/UploadPhotoWidget';

const { REACT_APP_API_BASE_PATH } = process.env;

const EventCreate = ({ setShowNavFooter }) => {
  const [eventData, setEventData] = useState({});
  const [errMsg, setErrMsg] = useState();
  const token = localStorage.getItem('JWTtoken');
  const navigate = useNavigate();
  const [showTime, setShowTime] = useState(new Date());
  const [currentUser, setCurrentUser] = useState();
  const [showPhotoUpload, setShowPhotoUplod] = useState(false);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);

  useEffect(() => {
    if (!token) return;
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
  }, [token]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let ConvertedShowTime = formatingDateTimeString(showTime);
      const newEvent = {
        ...eventData,
        host: currentUser.userId,
        showTime: ConvertedShowTime,
        photo_url: photo
      };

      const response = await axios.post(
        `${REACT_APP_API_BASE_PATH}/events`,
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = await axios.get(
        `${REACT_APP_API_BASE_PATH}/profile/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let cinemaCode = eventData.postalcode.replace(' ', '');
      let homeCode = profile.data.postalcode.replace(' ', '');

      navigate(
        `/profile/event/${response.data.eventId}/area/${
          cinemaCode + '&' + homeCode
        }`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="event-create" onSubmit={handleSubmit}>
        <p className="event-create__label">Movie Photo</p>
        <div className="event-create__photo-upload-container">
          <ProfilePhotoUpload
            openUploadForm={setShowPhotoUplod}
            photo={photo}
          />
        </div>
        <div className="event-create__input-container--tablet">
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="movieName">
              Name Of The Movie
            </label>
            <input
              className="event-create__input"
              name="movieName"
              value={eventData.movieName || ''}
              onChange={handleChange}
            />
          </div>
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="showtimes">
              Showtimes
            </label>
            <DateTimePicker
              onChange={setShowTime}
              value={showTime}
              locale="en"
              className={'event-create__input'}
            />
          </div>
        </div>
        <div className="event-create__input-container--tablet">
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="cinema">
              Cinema
            </label>
            <input
              className="event-create__input"
              name="cinema"
              value={eventData.cinema || ''}
              onChange={handleChange}
            />
          </div>
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="max">
              Cinema Address
            </label>
            <input
              className="event-create__input"
              name="address"
              value={eventData.address || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="event-create__input-container--tablet">
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="cinema">
              Cinema Postal Code
            </label>
            <input
              className="event-create__input"
              name="postalcode"
              value={eventData.postalcode || ''}
              onChange={handleChange}
            />
          </div>
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="max">
              Max People
            </label>
            <input
              type="number"
              className="event-create__input"
              name="max"
              min="1"
              value={eventData.max || 1}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="event-create__input-container--tablet event-create__input-container--tablet--aboutme">
          <div className="event-create__input-container">
            <div className="event-create__bottom-right-container">
              <div className="event-create__button-outter-container event-create__button-outter-container--tablet">
                <div className="event-create__button-inner-container">
                  <Button
                    buttonText={'Redo'}
                    UniqueStyleClass={
                      'event-create__button event-create__button--redo'
                    }
                  />
                  <Button
                    buttonText={'Cancel'}
                    UniqueStyleClass={
                      'event-create__button event-create__button--cancel'
                    }
                  />
                </div>
                <Button
                  buttonText={'Save'}
                  UniqueStyleClass={
                    'event-create__button event-create__button--save'
                  }
                />
              </div>
            </div>
          </div>
          <div className="event-create__input-container">
            <label className="event-create__label" htmlFor="notes">
              Notes
            </label>
            <textarea
              className="event-create__input event-create__input--notes"
              name="notes"
              value={eventData.notes || ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="event-create__button-outter-container">
          <div className="event-create__button-inner-container">
            <Button
              buttonText={'Redo'}
              UniqueStyleClass={
                'event-create__button event-create__button--redo'
              }
            />
            <Button
              buttonText={'Cancel'}
              UniqueStyleClass={
                'event-create__button event-create__button--cancel'
              }
            />
          </div>
          <Button
            buttonText={'Save'}
            UniqueStyleClass={'event-create__button event-create__button--save'}
          />
        </div>
      </form>
      {showPhotoUpload && (
        <>
          <div className="overlay"></div>
          <UploadPhotoWidget
            closeUpload={setShowPhotoUplod}
            setPhoto={setPhoto}
          />
        </>
      )}
      {/* {showPostalCodeModal && (
        <>
          <div className="overlay"></div>
          <PostalCodeMsg cinemaCode={cinemaCode} homeCode={homeCode} />
        </>
      )} */}
    </>
  );
};

export default EventCreate;
