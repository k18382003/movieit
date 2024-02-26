import './CalendarWithNextEvent.scss';
import Calendar from 'react-calendar';
import NextEvent from './NextEvent';

const CalendarWithNextEvent = ({ userId }) => {

  return (
    <>
        <div className="calendar-event__tablet-container">
          <Calendar calendarType="gregory" locale="en-GB" />
          <div className="calendar-event__next-event-outter-conatiner">
            <h2 className="calendar-event__next-event-text">Next Event</h2>
            <NextEvent userId={userId} />
          </div>
        </div>
    </>
  );
};

export default CalendarWithNextEvent;
