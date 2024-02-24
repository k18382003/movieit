import { MultiSelect } from 'react-multi-select-component';
import ProfilePhotoUpload from '../Profile/ProfileEdit/ProfilePhotoUpload';
import Button from '../Button/Button';
import './EventCreate.scss';
import { useEffect } from 'react';

const EventCreate = ({ setShowNavFooter }) => {
  useEffect(() => {
    setShowNavFooter(true);
  }, []);
  return (
    <form className="event-create">
      <p className="event-create__label">Movie Photo</p>
      <div className="event-create__photo-upload-container">
        <ProfilePhotoUpload />
      </div>
      <div className="event-create__input-container--tablet">
        <div className="event-create__input-container">
          <label className="event-create__label" htmlFor="movieName">
            Name Of The Movie
          </label>
          <input className="event-create__input" name="movieName" />
        </div>
        <div className="event-create__input-container">
          <label className="event-create__label" htmlFor="showtimes">
            Showtimes
          </label>
          <input className="event-create__input" name="showtimes" />
        </div>
      </div>
      <div className="event-create__input-container--tablet">
        <div className="event-create__input-container">
          <label className="event-create__label" htmlFor="cinemas">
            Cinemas
          </label>
          <input className="event-create__input" name="cinemas" />
        </div>
        <div className="event-create__input-container">
          <label className="event-create__label" htmlFor="max">
            Max People
          </label>
          <input className="event-create__input" name="max" />
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
          <input
            className="event-create__input event-create__input--notes"
            name="notes"
          />
        </div>
      </div>
      <div className="event-create__button-outter-container">
        <div className="event-create__button-inner-container">
          <Button
            buttonText={'Redo'}
            UniqueStyleClass={'event-create__button event-create__button--redo'}
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
  );
};

export default EventCreate;
