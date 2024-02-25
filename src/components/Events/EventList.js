import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './EventList.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
const { REACT_APP_API_BASE_PATH } = process.env;

const EventList = ({ setShowNavFooter }) => {
  const token = localStorage.getItem('JWTtoken');
  const [eventList, setEventList] = useState();

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
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API_BASE_PATH}/events`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setEventList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      {eventList && (
        <section className="eventlist">
          <h1 className="eventlist__greeting">Welcome back, Summer</h1>
          <div className="eventlist__title-container">
            <p className="eventlist__next-event-text">All Events</p>
            <Button
              buttonText={'My Events'}
              UniqueStyleClass={'eventlist__my-events-button'}
            />
          </div>
          <div className="eventlist__tablet-outter-container">
            <CalendarWithNextEvent movie={tempData[0]} />
            <div className="eventlist__tablet-list-container">
              {eventList.map((movie) => {
                return <EventItem key={movie.id} movie={movie} />;
              })}
              <p className="eventlist__load-more">Load More</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventList;
