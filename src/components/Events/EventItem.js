import batman from '../../assets/images/Batman.png';
import './EventItem.scss';

const EventItem = ({ movie }) => {
  return (
    <div className={`event-item`}>
      <div
        className="event-item__image"
        style={{ backgroundImage: `url(${batman})` }}
      ></div>
      <div className="event-item__info">
        <p className="event-item__showtime">{movie.showtime}</p>
        <p className="event-item__moviename">{movie.moviename}</p>
        <p className="event-item__cinema">{movie.cinema}</p>
      </div>
    </div>
  );
};

export default EventItem;
