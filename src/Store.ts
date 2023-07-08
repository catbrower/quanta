import { configureStore } from "@reduxjs/toolkit";
import GUISlice from "./gui/GUISlice";

export const store = configureStore({
    reducer: {
        gui: GUISlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;