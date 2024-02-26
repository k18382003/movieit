import face from '../../assets/icons/face-savoring-food.png';
import like from '../../assets/icons/like.png';
import location from '../../assets/icons/location.png';
import timeLine from '../../assets/icons/time-line.png';
import profilePhoto from '../../assets/images/tempPhoto.jpg';
import left from '../../assets/icons/swipe-left.png';
import invitation from '../../assets/icons/send-invitation.png';
import right from '../../assets/icons/swipe-right.png';
import './ProfileCard.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Metrics from './Metrics/Metrics';
const { REACT_APP_API_BASE_PATH } = process.env;

const ProfileCard = ({ setShowNavFooter, currentUser}) => {
  const token = localStorage.getItem('JWTtoken');
  const [profileDeatil, setProfileDetail] = useState();
  const { id } = useParams();

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

    const fetchProfileDetail = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileDetail({
          ...response.data,
          genres: reStructureString(response.data.genres),
          snacks: reStructureString(response.data.snacks),
          preferdays: reStructureString(response.data.preferdays),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileDetail();
  }, [token, id]);

  return (
    <>
      {profileDeatil && currentUser && (
        <section className="profile-card">
          <div className="profile-card__card-container">
            <div
              className="profile-card__image"
              style={{ backgroundImage: `url(${profilePhoto})` }}
            ></div>
            <div className="profile-card__info">
              <h2 className="profile-card__username">
                {profileDeatil.displayname}
              </h2>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={like} />
                <p className="profile-card__data">{profileDeatil.genres}</p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={face} />
                <p className="profile-card__data">{profileDeatil.snacks}</p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={location} />
                <p className="profile-card__data">
                  {profileDeatil.postalcode}, {profileDeatil.city}
                </p>
              </div>
              <div className="profile-card__data-container">
                <img className="profile-card__icon" src={timeLine} />
                <p className="profile-card__data">{profileDeatil.preferdays}</p>
              </div>
              <article className="profile-card__data-container profile-card__data-container--bio">
                <p className="profile-card__bio ">{profileDeatil.bio}</p>
              </article>
            </div>
          </div>
          {currentUser.userId == id ? (
            <Metrics />
          ) : (
            <div className="profile-card__buttons">
              <img
                src={left}
                onClick={() => alert('left123')}
                className="hidden"
              />
              <img src={invitation} onClick={() => alert('middle')} />
              <img src={right} onClick={() => alert('right')} />
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default ProfileCard;
