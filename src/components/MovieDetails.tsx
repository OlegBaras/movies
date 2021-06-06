import "../styles/MovieDetails.scss";
import { Movie } from "../interfaces";
import { ImFilm } from "react-icons/im";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-details">
      <div className="extra-details">
        <p>Year : {movie.Year}</p>
        <p>Type : {movie.Type}</p>
      </div>
      <div className="image">
        <img src={movie.Poster} alt="poster" />
      </div>
      <div className="description">
        <p>
          <ImFilm />
        </p>
        <p>{movie.Title}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
