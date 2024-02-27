import defaultPhoto from '../../assets/images/Default-Avatar.png';
import time from '../../assets/icons/time-line.png';
import location from '../../assets/icons/location.png';
import people from '../../assets/icons/people.png';
import attend from '../../assets/icons/attend.png';
import edit from '../../assets/icons/edit.png';
import batman from '../../assets/images/Batman.png';
import './EventDetails.scss';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteEvent from '../Modals/Event/DeleteEvent';
const { REACT_APP_API_BASE_PATH } = process.env;

const EventDetail = ({ setShowNavFooter }) => {
  const token = localStorage.getItem('JWTtoken');
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState();
  const [evetntHost, setEvetntHost] = useState();
  const [participantsList, setParticipantsList] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [showDelete, setShowDelete] = useState(false);

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
        setEvetntHost({
          userId: response.data.user_id,
          hostName: response.data.displayname,
          photo: response.data.photo_url,
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
        setParticipantsList(reponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEventDetail();
    fetchParticipante();
  }, []);

  const handleJoin = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_PATH}/participants/`,
        {
          user_id: currentUser.userId,
          event_id: eventId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = await axios.get(
        `${REACT_APP_API_BASE_PATH}/profile/${currentUser.userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let newParticipantsList = [
        ...participantsList,
        { user_id: currentUser.userId, displayname: profile.data.displayname },
      ];
      setParticipantsList(newParticipantsList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelAttend = async () => {
    try {
      const response = await axios.delete(
        `${REACT_APP_API_BASE_PATH}/participants/${eventId}/${currentUser.userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let newParticipantsList = participantsList.filter(
        (p) => p.user_id !== currentUser.userId
      );
      setParticipantsList(newParticipantsList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {eventDetail && evetntHost && (
        <section className="event-detail">
          <div className="event-detail__tablet-left">
            <div className="event-detail__name-button">
              <h1 className="event-detail__movie-name">
                {eventDetail.movie_name}
              </h1>
              <Link to={`/events/edit/${eventId}`}>
                <img className="event-detail__edit-button" src={edit} />
              </Link>
            </div>
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
                    {participantsList?.length} ppl going
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
                    src={evetntHost.photo || defaultPhoto}
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
                        <div
                          key={p.user_id}
                          className="event-detail__who-is-going--individual-container"
                        >
                          <Link to={`/profile/${p.user_id}`}>
                            <img
                              className="event-detail__who-is-going--attendees-img"
                              src={p.photo_url || defaultPhoto}
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
              <div>
                {currentUser.userId == evetntHost.userId ? (
                  <>
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
                      onClick={() => setShowDelete(true)}
                    />
                  </>
                ) : participantsList.find(
                    (p) => p.user_id == currentUser.userId
                  ) ? (
                  <Button
                    buttonText={'Cancel Attend'}
                    UniqueStyleClass={
                      'event-detail__button event-detail__button--cancel'
                    }
                    onClick={handleCancelAttend}
                  />
                ) : (
                  <Button
                    buttonText={'Join'}
                    UniqueStyleClass={
                      'event-detail__button event-detail__button--invite'
                    }
                    onClick={handleJoin}
                  />
                )}
              </div>
            </div>
          </div>
          <img className="event-detail__action-icon" src={attend} />
        </section>
      )}
      {showDelete && (
        <>
          <div className="overlay"></div>
          <DeleteEvent showModal={setShowDelete} eventId={eventId} />
        </>
      )}
    </>
  );
};

export default EventDetail;
