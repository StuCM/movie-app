import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    value: string;

}

const initialState: SearchState = {
    value: ''
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state: SearchState, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;