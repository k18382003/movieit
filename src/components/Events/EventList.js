import Calendar from 'react-calendar';
import Button from '../Button/Button';
import EventItem from './EventItem';
import batman from '../../assets/images/Batman.png';
import './EventList.scss';

const EventList = () => {
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

  return (
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
        <div className="eventlist__tablet-container">
          <Calendar calendarType="US" locale="en-GB" />
          <div className="eventlist__next-event-outter-onatiner">
            <h2 className="eventlist__next-event-text">Next Event</h2>
            <div className={'eventlist__nexte-event-inner-container'}>
              <div
                className="eventlist__next-event-image"
                style={{ backgroundImage: `url(${batman})` }}
              ></div>
              <div className="eventlist__next-event-info">
                <p className="eventlist__next-event-showtime">
                  {tempData[0].showtime}
                </p>
                <p className="eventlist__next-event-moviename">
                  {tempData[0].moviename}
                </p>
                <div className="eventlist__next-event-cinema-ppl">
                  <p className="eventlist__next-event-cinema">
                    {tempData[0].cinema}
                  </p>
                  <p className="eventlist__ppl-going">2 ppl going</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="eventlist__tablet-list-container">
          {tempData.map((movie) => {
            return <EventItem movie={movie} />;
          })}
          <p className="eventlist__load-more">Load More</p>
        </div>
      </div>
    </section>
  );
};

export default EventList;
