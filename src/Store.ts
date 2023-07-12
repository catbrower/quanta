import { configureStore } from "@reduxjs/toolkit";
import GUISlice from "./gui/GUISlice";
import CodeSlice from "./code/CodeSlice";

export const store = configureStore({
    reducer: {
        gui: GUISlice,
        code: CodeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;