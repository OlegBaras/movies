import { useState, useEffect } from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails";
import "../styles/FavouriteMovies.scss";
import { Movie } from "../interfaces";

const FavouriteMovies = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const url = "https://www.omdbapi.com/?apikey=d5942f61&i=";
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
