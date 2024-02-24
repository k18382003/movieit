import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { MultiSelect } from 'react-multi-select-component';
import './ProfileEditForm.scss';
import { genres, snacks, days } from '../DropDownData';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import axios from 'axios';
const { REACT_APP_API_BASE_PATH } = process.env;

const ProfileEditForm = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [errMsg, setErrMsg] = useState();
  const token = localStorage.getItem('JWTtoken');

  const turnStringtoArray = (data) => {
    const splitArr = data?.split(',');
    let result = [];
    splitArr?.forEach((item) => {
      result.push({ label: item, value: item.toLowerCase() });
    });
    return result;
  };

  const turnArryToString = (objArr) => {
    const valueArr = objArr.map((obj) => obj.value);
    return valueArr?.join(',');
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchProfile = async (currentUserId, userName) => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const displayname = response.data.displayname || userName;
        setUserProfile({ ...response.data, displayname: displayname });
        setSelectedGenres(turnStringtoArray(response.data.genres));
        setSelectedSnacks(turnStringtoArray(response.data.snacks));
        setSelectedDays(turnStringtoArray(response.data.preferdays));
      } catch (error) {
        console.error(error);
      }
    };

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
        fetchProfile(response.data.userId, response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, [token]);

  const handleChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedUserProfile = {
      postalcode: userProfile.postalcode,
      bio: userProfile.bio,
      displayname: userProfile.displayname,
      genres: turnArryToString(selectedGenres),
      snacks: turnArryToString(selectedSnacks),
      preferdays: turnArryToString(selectedDays),
    };

    try {
      const response = await axios.patch(
        `${REACT_APP_API_BASE_PATH}/profile/${userProfile.user_id}`,
        updatedUserProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Updated profile', response);
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
    <>
      {userProfile && (
        <form className="profile-form" onSubmit={handleSubmit}>
          <p className="profile-form__label">Photo Upload</p>
          <ProfilePhotoUpload />
          <div className="profile-form__input-container--tablet">
            <div className="profile-form__input-container">
              <label className="profile-form__label" htmlFor="username">
                Display Name
              </label>
              <input
                className="profile-form__input"
                name="displayname"
                value={userProfile.displayname || userProfile.username}
                onChange={handleChange}
              />
            </div>
            <div className="profile-form__input-container">
              <label className="profile-form__label" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                className="profile-form__input"
                name="postalcode"
                value={userProfile.postalcode}
                onChange={handleChange}
              />
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
                name="bio"
                value={userProfile.bio || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="profile-form__button-outter-container">
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
        </form>
      )}
    </>
  );
};

export default ProfileEditForm;
