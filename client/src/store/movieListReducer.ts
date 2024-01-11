import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/types';

export const fetchMovies = createAsyncThunk<Movie[], string>(
    'movieList/fetchMovies',
    async (searchRequest) => {
        try {
            const response: Response = await fetch(`http://localhost:5000/api?search=${searchRequest}`);
            const data: Movie[] = await response.json();
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
            state.selectedMovie = state.movies.find((movie) => movie.imdbID === action.payload) as Movie ?? null;
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