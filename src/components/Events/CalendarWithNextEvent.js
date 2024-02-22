import './CalendarWithNextEvent.scss';
import batman from '../../assets/images/Batman.png';
import Calendar from 'react-calendar';

const CalendarWithNextEvent = ({ movie }) => {
  return (
    <div className="calendar-event__tablet-container">
      <Calendar calendarType="gregory" locale="en-GB" />
      <div className="calendar-event__next-event-outter-onatiner">
        <h2 className="calendar-event__next-event-text">Next Event</h2>
        <div className={'calendar-event__nexte-event-inner-container'}>
          <div
            className="calendar-event__next-event-image"
            style={{ backgroundImage: `url(${batman})` }}
          ></div>
          <div className="calendar-event__next-event-info">
            <p className="calendar-event__next-event-showtime">
              {movie.showtime}
            </p>
            <p className="calendar-event__next-event-moviename">
              {movie.moviename}
            </p>
            <div className="calendar-event__next-event-cinema-ppl">
              <p className="calendar-event__next-event-cinema">
                {movie.cinema}
              </p>
              <p className="calendar-event__ppl-going">2 ppl going</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWithNextEvent;
