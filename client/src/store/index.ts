import { configureStore } from "@reduxjs/toolkit";
import { movieListReducer } from "./movieListReducer";
import { searchReducer } from "./searchReducer";

export const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;