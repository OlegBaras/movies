import axios from "axios";
import { useState } from "react";
import "../styles/FavouriteMovies.scss";

const FavouriteMovies = () => {
  const favouriteMoviesIDs = ["tt0120689", "tt0758758", "tt0120735"];
  const [favourieMovies, setFavouriteMovies] = useState([]);

  let one = "http://www.omdbapi.com/?apikey=89285fbf&i=tt0120689";
  let two = "http://www.omdbapi.com/?apikey=89285fbf&i=tt0758758";
  let three = "http://www.omdbapi.com/?apikey=89285fbf&i=tt0120735";

  const requestOne = axios.get(one);
  const requestTwo = axios.get(two);
  const requestThree = axios.get(three);

  axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
      })
    )
    .catch((errors) => console.log(errors));

  return (
    <div className="favourite-movies">
      <h1>Favourite Movies</h1>
    </div>
  );
};

export default FavouriteMovies;
