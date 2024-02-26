import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './MyEvent.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NextEvent from './NextEvent';
const { REACT_APP_API_BASE_PATH } = process.env;

const MyEvents = ({ setShowNavFooter }) => {
  const token = localStorage.getItem('JWTtoken');
  const [myEvents, setMyEvents] = useState();
  const [currentUser, setCurrentUser] = useState();
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
            Welcome back, {currentUser?.displayname}
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
            <NextEvent userId={currentUser?.userId} />
          </div>
          <div className="myevent__tablet-outter-container">
            <CalendarWithNextEvent userId={currentUser?.userId} />
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
