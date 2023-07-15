import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";
import { IWindow } from "./GUITypes";
import { v4 as uuidv4 } from 'uuid';

interface GUIState {
    isMenuOpen: boolean,
    windows: IWindow[]
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
        openObjectWindow: (state, action) => {
            const canPush = state.windows.filter(window => window.id !== action.payload).length === 0;

            if(canPush) {
                state.windows.push({
                    id: uuidv4(),
                    name: action.payload.name,
                    type: "object",
                    state: "maximized",
                    data: action.payload
                });
            }
        },
        closeObjectWindow: (state, action) => {
            state.windows = state.windows.filter(window => window.id !== action.payload)
        }
    }
});

export const { openMenu, closeMenu, openObjectWindow, closeObjectWindow } = guiSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default guiSlice.reducer;