import { configureStore } from "@reduxjs/toolkit";
import GUISlice from "./redux/GUISlice";
import CodeSlice from "./redux/CodeSlice";

export const store = configureStore({
    reducer: {
        gui: GUISlice,
        code: CodeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;