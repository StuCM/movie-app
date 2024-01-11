import { useState } from "react";
import { MovieType } from "../types/types";

interface MovieProps {
  movie: MovieType;
  handleClick: (id: number) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, handleClick }) => {
    const [loaded, setLoaded] = useState(false);
  return (
    <div key={movie.id}>
        <>
          <div className="image-container">
            <img
              style={{display: loaded ? 'block' : 'none'}}
              src={movie.poster_path}
              id={movie.id.toString()}
              alt={movie.title}
              onClick={() => handleClick(movie.id)}
              draggable={false}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="movie-info" style={{display: loaded ? 'block' : 'none'}}>
            <p>{movie.title}</p>

            <p>{movie.release_date}</p>
          </div>
        </>
    </div>
  );
};

export default Movie;
