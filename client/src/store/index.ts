import { configureStore } from "@reduxjs/toolkit";
import { movieListReducer } from "./movieListReducer";
import { searchReducer } from "./searchReducer";
import { modalReducer } from "./modalReducer";

export const store = configureStore({
    reducer: {
        movieList: movieListReducer,
        search: searchReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;