import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './EventList.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { REACT_APP_API_BASE_PATH } = process.env;

const EventList = ({ setShowNavFooter }) => {
  const token = localStorage.getItem('JWTtoken');
  const [eventList, setEventList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [eventNum, setEventNum] = useState(6);
  const [reachEnd, setReachEnd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowNavFooter(true);
  }, []);

  useEffect(() => {
    if (!token) {
      toast.error('Unauthorized. Please sign in.', {
        position: 'top-center',
      });
      navigate('/');
    }
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
            eventnum: eventNum,
          },
        });
        if (response.data.length == 0) {
          setReachEnd(true);
          toast.info('Reach the end of the List', {
            position: 'bottom-center',
          });
        }
        setEventList([...eventList, ...response.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [token, eventNum]);

  const handleLoadMore = () => {
    if (!reachEnd) {
      setEventNum(eventNum + 6);
    } else {
      toast.info('Reach the end of the List', {
        position: 'bottom-center',
      });
    }
  };

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
            <CalendarWithNextEvent userId={currentUser?.userId} />
            <div className="eventlist__tablet-list-container">
              {eventList.length > 0 ? (
                eventList.map((movie) => {
                  return <EventItem key={movie.id} movie={movie} />;
                })
              ) : (
                <h1>No New Events</h1>
              )}
              {eventList.length > 6 && (
                <p className="eventlist__load-more" onClick={handleLoadMore}>
                  Load More
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventList;
