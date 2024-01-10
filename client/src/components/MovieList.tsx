import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieListReducer"
import { AppDispatch, RootState } from "../store";
import { Movie } from "../types/types";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieList = useSelector((state: RootState) => state.movieList);
  

  useEffect(() => {
    console.log("dispatching fetchMovies")
    dispatch(fetchMovies());
  }, [dispatch]);

  console.log(movieList)
  return (
    <div className="movie-list">
      {movieList.map((movie: Movie) => (
        <div className="movie-container" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
