import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './EventList.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { REACT_APP_API_BASE_PATH } = process.env;

const EventList = ({ setShowNavFooter }) => {
  const [token, setToken] = useState(localStorage.getItem('JWTtoken'));
  const [eventList, setEventList] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);
  const tempData = [
    {
      showtime: '02/12/2024 18:45',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/12/2024 18:45',
      moviename: 'The Batman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/13/2024 20:45',
      moviename: 'Spider Man: Home coming',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '02/22/2024 09:45',
      moviename: 'Scream: I’m Back',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '03/02/2024 10:45',
      moviename: 'Minions 3',
      cinema: 'Cineplex Cinemas Metropolis',
    },
    {
      showtime: '03/05/2024 21:30',
      moviename: 'Aquaman',
      cinema: 'Cineplex Cinemas Metropolis',
    },
  ];
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
        const profile = await axios.get(
          `${REACT_APP_API_BASE_PATH}/profile/${response.data.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser({
          ...response.data,
          displayname: profile.data.displayname,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
  }, [token]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_BASE_PATH}/events`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setEventList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [token]);

  return (
    <>
      {eventList && (
        <section className="eventlist">
          <h1 className="eventlist__greeting">
            Welcome back, {currentUser?.displayname}
          </h1>
          <div className="eventlist__title-container">
            <p className="eventlist__next-event-text">All Events</p>
            <Link to={'/myevents'}>
              <Button
                buttonText={'My Events'}
                UniqueStyleClass={'eventlist__my-events-button'}
              />
            </Link>
          </div>
          <div className="eventlist__tablet-outter-container">
            <CalendarWithNextEvent movie={tempData[0]} />
            <div className="eventlist__tablet-list-container">
              {eventList.map((movie) => {
                return <EventItem key={movie.id} movie={movie} />;
              })}
              {eventList.length > 2 && (
                <p className="eventlist__load-more">Load More</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventList;
