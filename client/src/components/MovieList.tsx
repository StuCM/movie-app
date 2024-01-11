import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, selectMovie } from "../store/movieListReducer"
import { AppDispatch, RootState } from "../store";
import { Movie } from "../types/types";
import Heading from "./Heading";
import { toggleOpen } from "../store/modalReducer";

const MovieList = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieList = useSelector((state: RootState) => state.movieList);
  const search = useSelector((state: RootState) => state.search);
  
  useEffect(() => {
    dispatch(fetchMovies(search.value));
  }, [dispatch]);

  const handleClick = ((id:string) => {
    dispatch(selectMovie(id))
    dispatch(toggleOpen())
  });

  return (
    <>
    <Heading search={search.value} />
    <div className="movie-list" style={{ justifyContent: movieList.movies.length > 0 ? "flex-start" : "center"}}>
      {movieList.movies.length > 0 ? movieList.movies.map((movie: Movie) => (
        <div>
          <div className="image-container">
            <img 
              src={movie.Poster} 
              key={movie.imdbID}
              id={movie.imdbID} 
              alt={movie.Title} 
              onClick={() => handleClick(movie.imdbID)}
            />
          </div>
          <div className="movie-info">
            <p>{movie.Title}</p>
            <span>{movie.Year}</span>
          </div>
        </div>
          
      )) : <h2>No movies found</h2>}
    </div>
    </>
  );
};

export default MovieList;
