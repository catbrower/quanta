import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";

interface GUIState {
    isMenuOpen: boolean,
    windows: any[]
}

const initialState: GUIState = {
    isMenuOpen: false,
    windows: []
}

export const guiSlice = createSlice({
    name: "guiSlice",
    initialState,
    reducers: {
        openMenu: (state) => {state.isMenuOpen = true},
        closeMenu: (state) => {state.isMenuOpen = false},
        openObjectWindow: (state, action) => {state.windows.push(action.payload)},
        closeObjectWindow: (state, action) => {}
    }
});

export const { openMenu, closeMenu, openObjectWindow, closeObjectWindow } = guiSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default guiSlice.reducer;