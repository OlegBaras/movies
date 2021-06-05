import React from "react";
import "../styles/MovieDetails.scss";
import { Movie } from "../interfaces";
import { ImFilm } from "react-icons/im";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-details">
      <div className="image">
        <img src={movie.Poster} alt="poster" />
      </div>
      <div className="description">
        <p>{movie.Year}</p>
        <p>
          <ImFilm />
        </p>
        <p>{movie.Title}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
