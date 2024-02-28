import { Link } from 'react-router-dom';
import defaultMoviePhoto from '../../assets/images/default-movie-photo.png';
import './EventItem.scss';

const EventItem = ({ movie, uniqueStyle }) => {
  return (
    <Link className={`event-item ${uniqueStyle}`} to={`/events/${movie.id}`}>
      <div
        className="event-item__image"
        style={{
          backgroundImage: `url(${movie.photo_url || defaultMoviePhoto})`,
        }}
      ></div>
      <div className="event-item__info">
        <p className="event-item__showtime">{movie.show_time}</p>
        <p className="event-item__moviename">{movie.movie_name}</p>
        <p className="event-item__cinema">{movie.cinema}</p>
      </div>
    </Link>
  );
};

export default EventItem;
