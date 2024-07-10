import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import CalendarWithNextEvent from './CalendarWithNextEvent';
import EventItem from './EventItem';
import './MyEvent.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NextEvent from './NextEvent';
import { toast } from 'react-toastify';
import { fetchItemNum } from './globalVaraibles';
import { refreshTokenContext } from '../Security/RefreshTokenProvider';
const { REACT_APP_API_BASE_PATH } = process.env;

const MyEvents = () => {
  const [myHostedEvents, setMyHostedEvents] = useState();
  const [myInvitedEvents, setMyInvitedEvents] = useState();
  const [myPastEvents, setMyPastEvents] = useState([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [totalNumPastEvents, settotalNumPastEvents] = useState(0);
  const [pastEventNum, setPastEventNum] = useState(fetchItemNum);
  const { token } = useContext(refreshTokenContext);
  const navigate = useNavigate();

  useEffect(() => {
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
        setMyHostedEvents(response.data.hostedEvents);
        setMyInvitedEvents(response.data.invitedEvents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyEvents();
  }, [token, currentUser]);

  useEffect(() => {
    const LoadPastEvents = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_PATH}/events/mypastevent/${currentUser?.userId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
              eventnum: pastEventNum,
            },
          }
        );
        setMyPastEvents([...myPastEvents, ...response.data?.myPastEvents]);
        settotalNumPastEvents(response.data?.total);
      } catch (error) {
        console.log(error);
      }
    };
    LoadPastEvents();
  }, [pastEventNum, currentUser]);

  return (
    <>
      {myHostedEvents && myInvitedEvents && (
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
                  {myHostedEvents.length > 0 ? (
                    myHostedEvents.map((movie, index) => {
                      return (
                        <EventItem
                          key={index}
                          movie={movie}
                          uniqueStyle={'event-item-myevent'}
                        />
                      );
                    })
                  ) : (
                    <h1>No events</h1>
                  )}
                </div>
                <div className="myevent__event-container">
                  <p className="myevent__event-text myevent__event-text--invited">
                    Events Be Invited
                  </p>
                  {myInvitedEvents.length > 0 ? (
                    myInvitedEvents.map((movie, index) => {
                      return (
                        <EventItem
                          key={index}
                          movie={movie}
                          uniqueStyle={'event-item-myevent'}
                        />
                      );
                    })
                  ) : (
                    <h1>No events</h1>
                  )}
                </div>
              </div>
              <div className="myevent__past-event-container">
                <p className="myevent__past-event">Past Events</p>
              </div>
              <div className="myevent__tablet-past-events-container">
                {showPastEvents &&
                  myPastEvents &&
                  myPastEvents.map((movie, index) => {
                    return <EventItem key={index} movie={movie} />;
                  })}
              </div>
              <div className="myevent__load-more">
                <span onClick={() => setShowPastEvents(!showPastEvents)}>
                  {!showPastEvents ? 'View Past Events' : 'Close Past Events'}
                </span>

                {showPastEvents && pastEventNum < totalNumPastEvents && (
                  <span
                    className="myevent__load-more"
                    onClick={() => setPastEventNum(pastEventNum + fetchItemNum)}
                  >
                    Load More
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MyEvents;
