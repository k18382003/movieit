import face from '../../assets/icons/face-savoring-food.png';
import like from '../../assets/icons/like.png';
import location from '../../assets/icons/location.png';
import timeLine from '../../assets/icons/time-line.png';
import profilePhoto from '../../assets/images/tempPhoto.jpg';
import left from '../../assets/icons/swipe-left.png';
import invitation from '../../assets/icons/send-invitation.png';
import right from '../../assets/icons/swipe-right.png';
import './ProfileCardInvite.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Metrics from './Metrics/Metrics';
import Button from '../Button/Button';
const { REACT_APP_API_BASE_PATH } = process.env;

const ProfileCardInvite = ({ setShowNavFooter, currentUser }) => {
  const token = localStorage.getItem('JWTtoken');
  const [profileList, setProfileList] = useState();
  const [profileIndex, setProfileIndex] = useState(0);
  const { code, eventId } = useParams();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);

  const reStructureString = (input) => {
    let newString = '';
    const arr = input.split(',');
    arr.forEach(
      (item) =>
        (newString +=
          item[0].toUpperCase() + item.slice(1).toLowerCase() + ' / ')
    );
    return newString.slice(0, newString.length - 2);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchProfileList = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/area/${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setProfileList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileList();
  }, []);

  return (
    <>
      {profileList && (
        <section className="profile-card">
          <div className="profile-card__card-container">
            <div
              className="profile-card__image"
              style={{ backgroundImage: `url(${profilePhoto})` }}
            ></div>
            <div className="profile-card__info">
              <h2 className="profile-card__username">
                {profileList[profileIndex].displayname}
              </h2>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={like} />
                <p className="profile-card__data">
                  {reStructureString(profileList[profileIndex].genres)}
                </p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={face} />
                <p className="profile-card__data">
                  {reStructureString(profileList[profileIndex].snacks)}
                </p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={location} />
                <p className="profile-card__data">
                  {profileList[profileIndex].postalcode},{' '}
                  {profileList[profileIndex].city}
                </p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={timeLine} />
                <p className="profile-card__data">
                  {reStructureString(profileList[profileIndex].preferdays)}
                </p>
              </div>
              <article className="profile-card__data-container profile-card__data-container--bio">
                <p className="profile-card__bio ">
                  {profileList[profileIndex].bio}
                </p>
              </article>
            </div>
          </div>
          <div className="profile-card__buttons">
            <img
              src={left}
              onClick={() => setProfileIndex(profileIndex - 1)}
              className={profileIndex == 0 && 'hidden'}
            />
            <img src={invitation} onClick={() => alert('Invited!')} />
            {profileIndex == profileList.length - 1 ? (
              <Link to={`/events/${eventId}`}>
                <Button
                  UniqueStyleClass="back-button"
                  buttonText={'Event Detail'}
                />
              </Link>
            ) : (
              <img
                src={right}
                onClick={() => setProfileIndex(profileIndex + 1)}
                className={profileIndex == profileList.length - 1 && 'hidden'}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileCardInvite;