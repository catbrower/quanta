import { configureStore } from "@reduxjs/toolkit";
import GUISlice from "./GUISlice";
import CodeSlice from "./CodeSlice";
import contextMenuSlice from "./ContextMenuSlice";

export const store = configureStore({
  reducer: {
    gui: GUISlice,
    contextMenu: contextMenuSlice,
    code: CodeSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;