import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie } from '../types/types';

export const fetchMovies = createAsyncThunk<Movie[], void>(
    'movieList/fetchMovies',
    async () => {
        try {
            const response: Response = await fetch('http://localhost:5000/api');
            const data: Movie[] = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
);

const initialState: Movie[] = [];

export const movieListSlice = createSlice({
    name: 'movieList',
    initialState,
    reducers: {
        resetMovieList: (state) => {
            state.length = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (_state, action) => {
            return action.payload;
        });
    },
});

export const { resetMovieList } = movieListSlice.actions;

export const movieListReducer = movieListSlice.reducer;