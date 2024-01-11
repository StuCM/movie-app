import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/types';

export const fetchMovies = createAsyncThunk<Movie[], string>(
    'movieList/fetchMovies',
    async (searchRequest) => {
        try {
            if(searchRequest === '') return [];
            const response: Response = await fetch(`/search/${searchRequest}`);
            console.log(response)
            const jsonResponse = await response.json();
            const data: Movie[] = jsonResponse
                .filter((movie: any) => movie.poster_path !== null)
                .map((movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    release_date: new Date(movie.release_date).toLocaleString('en-UK', { day: 'numeric', month: 'short', year: 'numeric' }),
                    poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }));            
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
);

interface MovieListState {
    movies: Movie[];
    selectedMovie: Movie | null;
}

const initialState: MovieListState = {
    movies: [],
    selectedMovie: null,
};

export const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        selectMovie: (state, action) => {
            state.selectedMovie = state.movies.find((movie) => movie.id === action.payload) as Movie ?? null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const { selectMovie } = movieListSlice.actions;

export const movieListReducer = movieListSlice.reducer;