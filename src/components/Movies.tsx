import React, { ReactElement } from "react";
//Components
import MovieDetails from "./MovieDetails";
//Interface
import { Movie } from "../interfaces";
//Style
import "../styles/Movies.scss";

interface Props {
  movies: Movie[];
}

const Movies: React.FC<Props> = ({
  movies,
}: {
  movies: Movie[];
}): ReactElement => {
  return (
    <div className="movies">
      <h1>Movies</h1>
      <div className="search-movies">
        {movies.map((movie) => (
          <MovieDetails movie={movie} key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
