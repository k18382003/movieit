import hostPhoto from '../../assets/images/tempPhoto.jpg';
import time from '../../assets/icons/time-line.png';
import location from '../../assets/icons/location.png';
import people from '../../assets/icons/people.png';
import attend from '../../assets/icons/attend.png';
import batman from '../../assets/images/Batman.png';
import attendees from '../../assets/images/temp-attendees.png';
import './EventDetails.scss';
import Button from '../Button/Button';

const EventDetail = () => {
  const tempData = {
    showtime: '02/12/2024 18:45:00',
    moviename: 'The Batman',
    location:
      'Cineplex Cinemas Metropolis , 4700 Kingsway, Burnaby, BC V5H 4M1',
    attendees: 2,
    maxAttend: 4,
    notes: 'Please meet at the entrance at 6:20 PM',
    hostId: '001',
  };

  const host = {
    name: 'Summer',
    photo: hostPhoto,
  };

  return (
    <section className="event-detail">
      <div className="event-detail__tablet-left">
        <h1 className="event-detail__movie-name">{tempData.moviename}</h1>
        <p className="event-detail__host-by">Host by {host.name}</p>
        <img className="event-detail__movie-image" src={batman} />
        <div className="event-detail__info">
          <div className="event-detail__data">
            <img className="event-detail__icon" src={time} />
            <p className="event-detail__content event-detail__content--showtime">
              {tempData.showtime}
            </p>
          </div>
          <div className="event-detail__data">
            <img className="event-detail__icon" src={location} />
            <p className="event-detail__content">{tempData.location}</p>
          </div>
          <div className="event-detail__attend-max-attend">
            <div className="event-detail__data">
              <img className="event-detail__icon" src={people} />
              <p className="event-detail__content event-detail__content--attendee">
                {tempData.attendees} ppl going
              </p>
            </div>
            <p className="event-detail__max-attend">Max {tempData.maxAttend}</p>
          </div>
        </div>
      </div>
      <div className="event-detail__tablet-right">
        <div className="event-detail__extra-info-container">
          <div className="event-detail__extra-info event-detail__extra-info--left">
            <p className="event-detail__extra-info--title">The Host</p>
            <img
              className="event-detail__extra-info--host-photo"
              src={host.photo}
            />
          </div>
          <div className="event-detail__extra-info event-detail__extra-info--right">
            <p className="event-detail__extra-info--title">Notes</p>
            <div className="event-detail__extra-info--note-container">
              <div className="event-detail__extra-info--note">
                {tempData.notes}
              </div>
            </div>
          </div>
        </div>
        <div className="event-detail__who-is-going">
          <p className="event-detail__who-is-going--title">Who is going</p>
          <div className="event-detail__who-is-going--attendees-outter-container">
            <div className="event-detail__who-is-going--attendees-container">
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
              <div className="event-detail__who-is-going--individual-container">
                <img
                  className="event-detail__who-is-going--attendees-img"
                  src={attendees}
                />
                <p className="event-detail__who-is-going--attendees-name">
                  Alice
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="event-detail__button-container">
          <Button
            buttonText={'Invite More'}
            UniqueStyleClass={
              'event-detail__button event-detail__button--invite'
            }
          />
          <Button
            buttonText={'Cancel Event'}
            UniqueStyleClass={
              'event-detail__button event-detail__button--cancel'
            }
          />
        </div>
      </div>
      <img className="event-detail__action-icon" src={attend} />
    </section>
  );
};

export default EventDetail;
