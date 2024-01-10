import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/movieListReducer"
import { AppDispatch, RootState } from "../store";
import { Movie } from "../types/types";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieList = useSelector((state: RootState) => state.movieList);
  const search = useSelector((state: RootState) => state.search);
  
  useEffect(() => {
    dispatch(fetchMovies(search.value));
  }, [dispatch]);

  return (
    <div className="movie-list">
      {movieList.length > 0 ? movieList.map((movie: Movie) => (
        <div className="movie-container" key={movie.imdbID}>
          <img src={movie.Poster} alt={movie.Title} />
          <div className="movie-info">
            <h3>{movie.Title}</h3>
            <span>{movie.Year}</span>
          </div>
        </div>
      )) : <h2>No movies found</h2>}
    </div>
  );
};

export default MovieList;
