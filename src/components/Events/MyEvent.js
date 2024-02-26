import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './MyEvent.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { REACT_APP_API_BASE_PATH } = process.env;

const MyEvents = ({ setShowNavFooter, currentUser }) => {
  const [token, setToken] = useState(localStorage.getItem('JWTtoken'));
  const [myEvents, setMyEvents] = useState();
  useEffect(() => {
    setShowNavFooter(true);
  }, []);
  const tempData = [
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/13/2024 20:45:00',
      moviename: 'Spider Man: Home coming',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/22/2024 09:45:00',
      moviename: 'Scream: I’m Back',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '03/02/2024 10:45:00',
      moviename: 'Minions 3',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '03/05/2024 21:30:00',
      moviename: 'Aquaman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
  ];

  const tempData1 = [
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/22/2024 09:45:00',
      moviename: 'Scream: I’m Back',
      cinema: 'Cineplex Cinemas Metropolis',
    },
  ];

  const tempData2 = [
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/12/2024 18:45:00',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
  ];
  useEffect(() => {
    if (!token) return;
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/events/myevent/${currentUser?.userId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setMyEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyEvents();
  }, [token, currentUser]);

  return (
    <>
      {myEvents && (
        <section className="myevent">
          <h1 className="myevent__greeting">
            Welcome back, {currentUser?.username}
          </h1>
          <div className="myevent__title-container">
            <p className="myevent__event-text myevent__event-text--next">
              Your Next Event
            </p>
            <Link to={'/events'}>
              <Button
                buttonText={'All Events'}
                UniqueStyleClass={'myevent__all-events-button'}
              />
            </Link>
          </div>
          <div className="myevent__event-container myevent__event-container--next-event">
            <EventItem movie={tempData[0]} />
            <p className="myevent__ppl-going">2 ppl going</p>
          </div>
          <div className="myevent__tablet-outter-container">
            <CalendarWithNextEvent movie={tempData[0]} />
            <div className="myevent__tablet-inner-container">
              <div className="myevent__tablet-inner-event-container">
                <div className="myevent__event-container">
                  <p className="myevent__event-text myevent__event-text--host">
                    Events You Host
                  </p>
                  {myEvents
                    .filter((e) => e.ishost)
                    .map((movie, index) => {
                      return (
                        <EventItem
                          key={index}
                          movie={movie}
                          uniqueStyle={'event-item-myevent'}
                        />
                      );
                    })}
                  <p className="myevent__load-more">Load More</p>
                </div>
                <div className="myevent__event-container">
                  <p className="myevent__event-text myevent__event-text--invited">
                    Events Be Invited
                  </p>
                  {myEvents
                    .filter((e) => !e.ishost)
                    .map((movie, index) => {
                      return (
                        <EventItem
                          key={index}
                          movie={movie}
                          uniqueStyle={'event-item-myevent'}
                        />
                      );
                    })}
                  <p className="myevent__load-more">Load More</p>
                </div>
              </div>
              <div className="myevent__past-event-container">
                <p className="myevent__past-event">Past Events</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MyEvents;
