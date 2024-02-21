import face from '../../assets/icons/face-savoring-food.png';
import like from '../../assets/icons/like.png';
import location from '../../assets/icons/location.png';
import timeLine from '../../assets/icons/time-line.png';
import profilePhoto from '../../assets/images/tempPhoto.jpg';
import left from '../../assets/icons/swipe-left.png';
import invitation from '../../assets/icons/send-invitation.png';
import right from '../../assets/icons/swipe-right.png';
import './ProfileCard.scss';

const ProfileCard = () => {
  const tempData = {
    username: 'Summer',
    genres: 'Horror,Action,Thriller',
    snacks: 'Popcorn,Chicken nuggets',
    postalCode: 'V5R 3V5',
    city: 'Vancouver',
    days: 'Saturday,Sunday',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in interdum dui. Curabitur vel purus ac metus luctus aliquet sit amet at lacus. Suspendisse pulvinar sapien scelerisque libero pretium blandit. Praesent mollis nisi et diam scelerisque, at luctus risus laoreet. Mauris ultricies dignissim felis. Integer mattis portat. ',
  };

  const reStructureString = (input) => {
    let newString = '';
    const arr = input.split(',');
    arr.forEach((item) => (newString += item + ' / '));
    return newString.slice(0, newString.length - 2);
  };

  return (
    <section className="profile-card">
      <div className="profile-card__card-container">
        <div
          className="profile-card__image"
          style={{ backgroundImage: `url(${profilePhoto})` }}
        ></div>
        <div className="profile-card__info">
          <h2 className="profile-card__username">{tempData.username}</h2>
          <div className="profile-card__data-container">
            <img className="profile-card__icon" src={like} />
            <p className="profile-card__data">
              {reStructureString(tempData.genres)}
            </p>
          </div>
          <div className="profile-card__data-container">
            <img className="profile-card__icon" src={face} />
            <p className="profile-card__data">
              {reStructureString(tempData.snacks)}
            </p>
          </div>
          <div className="profile-card__data-container">
            <img className="profile-card__icon" src={location} />
            <p className="profile-card__data">
              {tempData.postalCode}, {tempData.city}
            </p>
          </div>
          <div className="profile-card__data-container">
            <img className="profile-card__icon" src={timeLine} />
            <p className="profile-card__data">
              {reStructureString(tempData.days)}
            </p>
          </div>
          <article className="profile-card__data-container profile-card__data-container--bio">
            <p className="profile-card__bio ">{tempData.bio}</p>
          </article>
        </div>
      </div>
      <div className="profile-card__buttons">
        <img src={left} />
        <img src={invitation} />
        <img src={right} />
      </div>
    </section>
  );
};

export default ProfileCard;
