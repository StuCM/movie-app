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

  const handleClick = ((id:number) => {
    dispatch(selectMovie(id))
    dispatch(toggleOpen())
  });

  return (
    <>
    <Heading />
    <div className="movie-list" style={{ justifyContent: movieList.movies.length > 0 ? "flex-start" : "center"}}>
      {movieList.movies.length > 0 ? movieList.movies.map((movie: Movie) => (
        <div key={movie.id}>
          <div className="image-container">
            <img 
              src={movie.poster_path} 
              id={movie.id.toString()} 
              alt={movie.title} 
              onClick={() => handleClick(movie.id)}
            />
          </div>
          <div className="movie-info">
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
          </div>
        </div>
          
      )) : <h2>No movies found</h2>}
    </div>
    </>
  );
};

export default MovieList;
