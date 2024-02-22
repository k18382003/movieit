import { useState } from 'react';
import Button from '../../Button/Button';
import { MultiSelect } from 'react-multi-select-component';
import './ProfileEditForm.scss';
import { genres, snacks, days } from '../DropDownData';
import ProfilePhotoUpload from './ProfilePhotoUpload';

const ProfileEditForm = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  return (
    <form className="profile-form">
      <p className="profile-form__label">Photo Upload</p>
      <ProfilePhotoUpload />
      <div className="profile-form__input-container--tablet">
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="username">
            Username
          </label>
          <input className="profile-form__input" name="username" />
        </div>
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="postalCode">
            Postal Code
          </label>
          <input className="profile-form__input" name="postalCode" />
        </div>
      </div>
      <div className="profile-form__input-container--tablet">
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="genres">
            Favorite Genres
          </label>
          <MultiSelect
            options={genres}
            value={selectedGenres}
            onChange={setSelectedGenres}
            labelledBy="Select Generes"
            className="option profile-form__select"
          />
        </div>
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="snacks">
            Favorite Movie Snacks
          </label>
          <MultiSelect
            options={snacks}
            value={selectedSnacks}
            onChange={setSelectedSnacks}
            labelledBy="Select favorite movie snacks"
            className="option profile-form__select"
          />
        </div>
      </div>
      <div className="profile-form__input-container--tablet profile-form__input-container--tablet--aboutme">
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="preferDay">
            Preferable Movie Days
          </label>
          <div className="profile-form__bottom-right-container">
            <MultiSelect
              options={days}
              value={selectedDays}
              onChange={setSelectedDays}
              labelledBy="Select preferable movie days"
              className="option profile-form__select"
            />
            <div className="profile-form__button-outter-container profile-form__button-outter-container--tablet">
              <div className="profile-form__button-inner-container">
                <Button
                  buttonText={'Redo'}
                  UniqueStyleClass={
                    'profile-form__button profile-form__button--redo'
                  }
                />
                <Button
                  buttonText={'Cancel'}
                  UniqueStyleClass={
                    'profile-form__button profile-form__button--cancel'
                  }
                />
              </div>
              <Button
                buttonText={'Save'}
                UniqueStyleClass={
                  'profile-form__button profile-form__button--save'
                }
              />
            </div>
          </div>
        </div>
        <div className="profile-form__input-container">
          <label className="profile-form__label" htmlFor="aboutMe">
            About Me
          </label>
          <textarea
            className="profile-form__input profile-form__input--about"
            name="aboutMe"
          />
        </div>
      </div>
      <div className="profile-form__button-outter-container">
        <div className="profile-form__button-inner-container">
          <Button
            buttonText={'Redo'}
            UniqueStyleClass={'profile-form__button profile-form__button--redo'}
          />
          <Button
            buttonText={'Cancel'}
            UniqueStyleClass={
              'profile-form__button profile-form__button--cancel'
            }
          />
        </div>
        <Button
          buttonText={'Save'}
          UniqueStyleClass={'profile-form__button profile-form__button--save'}
        />
      </div>
    </form>
  );
};

export default ProfileEditForm;
