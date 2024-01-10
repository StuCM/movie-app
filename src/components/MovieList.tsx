import { useSelector } from "react-redux";
import { RootState } from "../store";

const MovieList = () => {
  const movieList = useSelector((state: RootState) => state.movieList.value);

  return (
    <>
      {movieList.map((movie) => (
        <div className="movie-container" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
