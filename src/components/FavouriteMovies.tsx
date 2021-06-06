import { useState, useEffect } from "react";
import axios from "axios";
//Components
import MovieDetails from "./MovieDetails";
//Styles
import "../styles/FavouriteMovies.scss";
//Interface
import { Movie } from "../interfaces";

const FavouriteMovies = () => {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=`;
    const ids = [
      "tt0120689",
      "tt0758758",
      "tt0108778",
      "tt0068646",
      "tt0109830",
      "tt0073486",
      "tt0120735",
      "tt0266697",
      "tt0118799",
    ];
    const promises = [];
    const favMovies: Movie[] = [];
    const requests = ids.map((id) => `${url}${id}`);

    for (let i = 0; i < requests.length; i++) {
      promises.push(axios.get(requests[i]));
    }

    axios.all(promises).then(
      axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
          favMovies[i] = args[i].data;
          setFavouriteMovies((previousMovies) => [
            ...previousMovies,
            args[i].data,
          ]);
        }
      })
    );
  }, []);

  return (
    <section className="favourite-movies">
      <h1>Favourite Movies</h1>
      <div className="favourite-list">
        {favouriteMovies.length
          ? favouriteMovies.map((movie: Movie) => (
              <MovieDetails movie={movie} key={movie.imdbID} />
            ))
          : null}
      </div>
    </section>
  );
};

export default FavouriteMovies;
