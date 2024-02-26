import { Link } from 'react-router-dom';
import batman from '../../assets/images/Batman.png';
import './NextEvent.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
const { REACT_APP_API_BASE_PATH } = process.env;

const NextEvent = ({ userId }) => {
  const token = localStorage.getItem('JWTtoken');
  const [nextEvent, setNextEvent] = useState();
  const [numParticipants, setNumParticipants] = useState(0);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/events/next/${userId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setNextEvent(response.data);
        fetchParticipante(response.data.id);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchParticipante = async (eventId) => {
      try {
        const reponse = await axios.get(
          `${REACT_APP_API_BASE_PATH}/participants/${eventId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setNumParticipants(reponse.data?.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNextEvent();
  }, [userId, token]);

  return (
    <>
      {nextEvent && (
        <Link to={`/events/${nextEvent.id}`} className="calendar-event__link">
          <div className={'calendar-event__next-event-inner-container'}>
            <div
              className="calendar-event__next-event-image"
              style={{ backgroundImage: `url(${batman})` }}
            ></div>
            <div className="calendar-event__next-event-info">
              <p className="calendar-event__next-event-showtime">
                {nextEvent.show_time}
              </p>
              <p className="calendar-event__next-event-moviename">
                {nextEvent.movie_name}
              </p>
              <div className="calendar-event__next-event-cinema-ppl">
                <p className="calendar-event__next-event-cinema">
                  {nextEvent.cinema}
                </p>
                <p className="calendar-event__ppl-going">
                  {numParticipants} ppl going
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default NextEvent;
