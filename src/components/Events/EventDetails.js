import hostPhoto from '../../assets/images/tempPhoto.jpg';
import time from '../../assets/icons/time-line.png';
import location from '../../assets/icons/location.png';
import people from '../../assets/icons/people.png';
import attend from '../../assets/icons/attend.png';
import batman from '../../assets/images/Batman.png';
import attendees from '../../assets/images/temp-attendees.png';
import './EventDetails.scss';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { REACT_APP_API_BASE_PATH } = process.env;

const EventDetail = ({ setShowNavFooter }) => {
  const token = localStorage.getItem('JWTtoken');
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState();
  const [evetntHost, setEvetntHost] = useState();
  const [participantsList, setParticipantsList] = useState();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);

  const host = {
    name: 'Summer',
    photo: hostPhoto,
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/events/${eventId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setEventDetail(response.data);
        fetchHost(response.data.host);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchHost = async (host_id) => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/${host_id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setEvetntHost({
          userId: response.data.user_id,
          hostName: response.data.displayname,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchParticipante = async () => {
      try {
        const reponse = await axios.get(
          `${REACT_APP_API_BASE_PATH}/participants/${eventId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(reponse.data);
        setParticipantsList(reponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetail();
    fetchParticipante();
  }, []);

  return (
    <>
      {eventDetail && evetntHost && (
        <section className="event-detail">
          <div className="event-detail__tablet-left">
            <h1 className="event-detail__movie-name">
              {eventDetail.movie_name}
            </h1>
            <p className="event-detail__host-by">
              Host by {evetntHost.hostName}
            </p>
            <img className="event-detail__movie-image" src={batman} />
            <div className="event-detail__info">
              <div className="event-detail__data">
                <img className="event-detail__icon" src={time} />
                <p className="event-detail__content event-detail__content--showtime">
                  {eventDetail.show_time}
                </p>
              </div>
              <div className="event-detail__data">
                <img className="event-detail__icon" src={location} />
                <p className="event-detail__content">
                  {eventDetail.cinema +
                    ' ' +
                    eventDetail.address +
                    ' ' +
                    eventDetail.postal_code}
                </p>
              </div>
              <div className="event-detail__attend-max-attend">
                <div className="event-detail__data">
                  <img className="event-detail__icon" src={people} />
                  <p className="event-detail__content event-detail__content--attendee">
                    {participantsList.length} ppl going
                  </p>
                </div>
                <p className="event-detail__max-attend">
                  Max {eventDetail.max_people}
                </p>
              </div>
            </div>
          </div>
          <div className="event-detail__tablet-right">
            <div className="event-detail__extra-info-container">
              <div className="event-detail__extra-info event-detail__extra-info--left">
                <p className="event-detail__extra-info--title">The Host</p>
                <Link to={`/profile/${evetntHost.userId}`}>
                  <img
                    className="event-detail__extra-info--host-photo"
                    src={host.photo}
                  />
                </Link>
              </div>
              <div className="event-detail__extra-info event-detail__extra-info--right">
                <p className="event-detail__extra-info--title">Notes</p>
                <div className="event-detail__extra-info--note-container">
                  <div className="event-detail__extra-info--note">
                    {eventDetail.notes}
                  </div>
                </div>
              </div>
            </div>
            <div className="event-detail__who-is-going">
              <p className="event-detail__who-is-going--title">Who is going</p>
              <div className="event-detail__who-is-going--attendees-outter-container">
                <div className="event-detail__who-is-going--attendees-container">
                  {participantsList &&
                    participantsList.map((p) => {
                      return (
                        <div className="event-detail__who-is-going--individual-container">
                          <Link to={`/profile/${p.user_id}`}>
                            <img
                              className="event-detail__who-is-going--attendees-img"
                              src={attendees}
                            />
                          </Link>
                          <p className="event-detail__who-is-going--attendees-name">
                            {p.displayname}
                          </p>
                        </div>
                      );
                    })}
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
      )}
    </>
  );
};

export default EventDetail;
