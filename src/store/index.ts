import { configureStore } from "@reduxjs/toolkit";
import { movieListReducer } from "./movieListReducer";

export const store = configureStore({
    reducer: {
        movieList: movieListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;