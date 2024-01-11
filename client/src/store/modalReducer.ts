import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleOpen: (state: ModalState) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleOpen } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;