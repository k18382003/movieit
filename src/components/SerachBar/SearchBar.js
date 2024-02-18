import search from '../../assets/icons/search.png';
import './SearchBar.scss';

const SearchBar = () => {
  return (
    <div className="search-container">
      <input className="search-container__search" placeholder="Movie Name" />
      <img className="search-container__search-icon" src={search} />
    </div>
  );
};

export default SearchBar;
