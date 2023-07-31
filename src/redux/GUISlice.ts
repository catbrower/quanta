import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { IEditorWindow, IWindow } from "../gui/GUITypes";
import { act } from "react-dom/test-utils";

interface ICollapseableProperty {
  id: string,
  isOpen: boolean,
  focus: HTMLElement
}

interface GUIState {
  isMenuOpen: boolean,
  previewWindowId: string,
  windows: (IWindow | IEditorWindow<any>)[],
  collapseableProperties: {}
}

const initialState: GUIState = {
  isMenuOpen: false,
  previewWindowId: uuidv4(),
  windows: [],
  collapseableProperties: {}
}

export const guiSlice = createSlice({
  name: "guiSlice",
  initialState,
  reducers: {
    openMenu: (state) => { state.isMenuOpen = true },
    closeMenu: (state) => { state.isMenuOpen = false },
    openObjectWindow: (state, action) => {
      const canPush = state.windows.filter(window => window.id !== action.payload).length === 0;

      if (canPush) {
        state.windows.push({
          id: uuidv4(),
          name: action.payload.name,
          type: "object",
          state: "maximized",
          data: action.payload,
          editData: structuredClone(action.payload)
        });
      }
    },
    closeObjectWindow: (state, action) => {
      state.windows = state.windows.filter(window => window.id !== action.payload)
    },
    openPreviewWindow: (state) => {
      const canPush = state.windows.filter(window => window.id !== state.previewWindowId).length === 0;

      if (canPush) {
        state.windows.push({
          id: state.previewWindowId,
          name: "Preview Window",
          type: "preview",
          state: "maximized"
        });
      }
    },
    setCollapsablePropertyState: (state, action: PayloadAction<ICollapseableProperty>) => {
      state.collapseableProperties = {
        ...state.collapseableProperties,
        [action.payload.id]: action.payload
      }
    }
  }
});

export const { openMenu, closeMenu, openObjectWindow, closeObjectWindow, openPreviewWindow } = guiSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default guiSlice.reducer;