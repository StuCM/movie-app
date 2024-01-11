import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setSearch } from "../store/searchReducer";
import { fetchMovies, fetchTopRatedMovies } from "../store/movieListReducer";
import { FormEvent, useRef } from "react";

const Search = () => {
    const dispatch: AppDispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const searchValue:string = inputRef.current?.value as string;
        if(searchValue) {
            dispatch(setSearch(searchValue));
            dispatch(fetchMovies(searchValue));
        } else {
            dispatch(setSearch(''));
            dispatch(fetchTopRatedMovies());
        }
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
            ref={inputRef}
            type="text" 
            placeholder="Enter a movie..." 
            />
            <button type="submit">Search</button>
        </form>
    )
};
export default Search;