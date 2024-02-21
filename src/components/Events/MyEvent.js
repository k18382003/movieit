import Button from '../Button/Button';
import EventItem from './EventItem';
import './MyEvent.scss';

const MyEvents = () => {
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

  return (
    <section className="myevent">
      <h1 className="myevent__greeting">Welcome back, Summer</h1>
      <div className="myevent__title-container">
        <p className="myevent__event-text myevent__event-text--next">
          Your Next Event
        </p>
        <Button
          buttonText={'All Events'}
          UniqueStyleClass={'myevent__all-events-button'}
        />
      </div>
      <div className="myevent__event-container">
        <EventItem movie={tempData[0]} />
        <p className="myevent__ppl-going">2 ppl going</p>
      </div>
      <div className="myevent__event-container">
        <p className="myevent__event-text myevent__event-text--host">
          Events You Host
        </p>
        {tempData1.map((movie) => {
          return <EventItem movie={movie} />;
        })}
      </div>
      <div className="myevent__event-container">
        <p className="myevent__event-text myevent__event-text--invited">
          Events Be Invited
        </p>
        {tempData2.map((movie) => {
          return <EventItem movie={movie} />;
        })}
      </div>
      <p className="myevent__load-more">Load More</p>
    </section>
  );
};

export default MyEvents;
