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
  const [url, setUrl] = useState(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchKeyWord}`
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchKeyWord.length) {
      const fetchItems = async () => {
        setIsError(false);
        setIsLoading(true);
        setMessage("");
        setMovies([]);
        try {
          const result = await axios.get(url);
          if (result && result.data && result.data.Search) {
            setMovies(result.data.Search);
            console.log(result.data.Search);
          } else if (result && result.data && result.data.Error) {
            setMessage(result.data.Error);
            console.log(result.data.Error, "error");
          }
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
      fetchItems();
      setMovies([]);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="App">
      <SearchBar
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        url={url}
        setUrl={setUrl}
        API_KEY={API_KEY}
      />
      <FavouriteMovies />
      {isError ? <div>Error</div> : null}
      {message ? <div className="message">{message}</div> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!isLoading && movies.length > 0 ? <Movies movies={movies} /> : null}
        </div>
      )}
    </div>
  );
};

export default App;
