import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setSearch } from "../store/searchReducer";
import { fetchMovies } from "../store/movieListReducer";

const Search = () => {
    const dispatch: AppDispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    }

    const handleSubmit = () => {
        dispatch(fetchMovies(search.value));
    }

    return (
        <div className="search-bar">
            <input 
            type="text" 
            placeholder="Enter a movie..." 
            value={search.value}
            onChange={handleChange}
            />
            <button onClick={handleSubmit}>Search</button>
        </div>
    )
};
export default Search;