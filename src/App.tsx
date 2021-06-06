import React, { useState, useEffect } from "react";
import axios from "axios";
//Components
import Movies from "./components/Movies";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import FavouriteMovies from "./components/FavouriteMovies";

//Interface
import { Movie } from "./interfaces";
//Styles
import "./App.scss";

const App: React.FC = () => {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [url, setUrl] = useState(
  //   `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchKeyWord}`
  // );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState("");

  const fetchItems = async (url: string) => {
    setIsError(false);
    setIsLoading(true);
    setMessage("");
    setMovies([]);
    try {
      const result = await axios.get(url);
      if (result && result.data && result.data.Search) {
        setMovies(result.data.Search);
      } else if (result && result.data && result.data.Error) {
        setMessage(result.data.Error);
      } else {
        return;
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };
  const onSearchClick = (url: string) => {
    setMovies([]);
    fetchItems(url);
  };

  return (
    <div className="App">
      <SearchBar
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        API_KEY={API_KEY}
        onSearchClick={onSearchClick}
      />
      {isError ? <div className="message">Something went wrong</div> : null}
      {message ? <div className="message">{message}</div> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!isLoading && movies.length > 0 ? <Movies movies={movies} /> : null}
        </div>
      )}
      <FavouriteMovies />
    </div>
  );
};

export default App;
