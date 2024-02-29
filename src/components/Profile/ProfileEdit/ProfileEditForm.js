import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { MultiSelect } from 'react-multi-select-component';
import './ProfileEditForm.scss';
import { genres, snacks, days } from '../DropDownData';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UploadPhotoWidget from '../../photoWidget/UploadPhotoWidget';
import { toast } from 'react-toastify';
const { REACT_APP_API_BASE_PATH } = process.env;

const ProfileEditForm = ({ setShowNavFooter }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [userProfile, setUserProfile] = useState();
  const [errMsg, setErrMsg] = useState();
  const [photo, setPhoto] = useState();
  const token = localStorage.getItem('JWTtoken');
  const navigate = useNavigate();
  const [showPhotoUpload, setShowPhotoUplod] = useState(false);
  const [originalData, setOriginalData] = useState();
  const [originalGenres, setOriginalGenres] = useState();
  const [originalSnacks, setOriginalSnacks] = useState();
  const [originalDays, setOriginalDays] = useState();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);

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
      toast.error('Unauthorized. Please sign in.', {
        position: 'top-center',
      });
      navigate('/');
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
        // if (
        //   Date.parse(response.data.updated_at) >
        //   Date.parse(response.data.created_at)
        // ) {
        //   navigate('/events');
        // }
        const displayname = response.data.displayname || userName;
        setUserProfile({ ...response.data, displayname: displayname });
        setSelectedGenres(turnStringtoArray(response.data.genres));
        setSelectedSnacks(turnStringtoArray(response.data.snacks));
        setSelectedDays(turnStringtoArray(response.data.preferdays));
        setPhoto(response.data.photo_url);
        // save original data in order to retrieve data
        setOriginalData({ ...response.data, displayname: displayname });
        setOriginalGenres(turnStringtoArray(response.data.genres));
        setOriginalSnacks(turnStringtoArray(response.data.snacks));
        setOriginalDays(turnStringtoArray(response.data.preferdays));
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
      city: userProfile.city,
      bio: userProfile.bio,
      displayname: userProfile.displayname,
      genres: turnArryToString(selectedGenres),
      snacks: turnArryToString(selectedSnacks),
      preferdays: turnArryToString(selectedDays),
    };

    try {
      await axios.patch(
        `${REACT_APP_API_BASE_PATH}/profile/${userProfile.user_id}`,
        updatedUserProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/profile/${userProfile.user_id}`);
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg(`${error.response?.data?.message}`);
      } else {
        setErrMsg('System error! Please contact our techical support.');
        console.log(error);
      }
    }
  };

  const handleRedo = () => {
    setUserProfile(originalData);
    setSelectedGenres(originalGenres);
    setSelectedSnacks(originalSnacks);
    setSelectedDays(originalDays);
  };

  return (
    <>
      {userProfile && (
        <>
          <form className="profile-form" onSubmit={handleSubmit}>
            <p className="profile-form__label">Photo Upload</p>
            <ProfilePhotoUpload
              openUploadForm={setShowPhotoUplod}
              photo={photo}
            />
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
              <div className="profile-form__input-container profile-form__input-container--city-postalcode">
                <div className="profile-form__input-container">
                  <label className="profile-form__label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="profile-form__input profile-form__input--city"
                    name="city"
                    value={userProfile.city}
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
                        type={'button'}
                        onClick={handleRedo}
                      />
                      <Button
                        buttonText={'Cancel'}
                        UniqueStyleClass={
                          'profile-form__button profile-form__button--cancel'
                        }
                        type={'button'}
                        onClick={() =>
                          navigate(`/profile/${userProfile.user_id}`)
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
                  type={'button'}
                  onClick={handleRedo}
                />
                <Button
                  buttonText={'Cancel'}
                  UniqueStyleClass={
                    'profile-form__button profile-form__button--cancel'
                  }
                  onClick={() => navigate(`/profile/${userProfile.user_id}`)}
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
          {showPhotoUpload && (
            <>
              <div className="overlay"></div>
              <UploadPhotoWidget
                closeUpload={setShowPhotoUplod}
                setPhoto={setPhoto}
                userId={userProfile.user_id}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default ProfileEditForm;
