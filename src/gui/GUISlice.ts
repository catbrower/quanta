import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";

interface GUIState {
    isMenuOpen: boolean,
    windows: []
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
        openWindow: (state) => {},
        closeWindow: (state) => {}
    }
});

export const { openMenu, closeMenu, openWindow, closeWindow } = guiSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default guiSlice.reducer;