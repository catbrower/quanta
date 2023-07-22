import { configureStore } from "@reduxjs/toolkit";
import GUISlice from "./GUISlice";
import CodeSlice from "./CodeSlice";

export const store = configureStore({
    reducer: {
        gui: GUISlice,
        code: CodeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;