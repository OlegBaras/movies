import React, { ReactElement } from "react";
//Style
import "../styles/SearchBar.scss";
//Icon
import { MdLocalMovies } from "react-icons/md";

interface Props {
  searchKeyWord: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  API_KEY: string | undefined;
  onSearchClick: Function;
}

const SearchBar: React.FC<Props> = ({
  searchKeyWord,
  setSearchKeyWord,
  onSearchClick,
  API_KEY,
}: {
  searchKeyWord: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  onSearchClick: any;
  API_KEY: string | undefined;
}): ReactElement => {
  //Submit event handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyWord(searchKeyWord);
    onSearchClick(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchKeyWord}`
    );
  };
  //Input change event handler
  const onSearchKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-bar">
        <div>
          <MdLocalMovies className="movie-icon" />
        </div>
        <div>
          <input
            type="text"
            name="searchKeyWord"
            value={searchKeyWord}
            onChange={onSearchKeyChange}
            autoComplete="off"
            required
            aria-label="search-movies"
            placeholder="Type film title here..."
          />
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
