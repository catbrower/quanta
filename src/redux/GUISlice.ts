import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { IEditorWindow, IWindow } from "../gui/GUITypes";
import { OBJECT_JSON_PATH_SEPERATOR } from "../Common";
import { IProgramObject } from "../program/ProgramInterfaces";

interface IUpdateObjectEditorData {
  type: string,
  payload: {
    path: string,
    data: any
  }
}

interface GUIState {
  isMenuOpen: boolean,
  previewWindowId: string,
  windows: (IWindow | IEditorWindow<any>)[]
}

const initialState: GUIState = {
  isMenuOpen: false,
  previewWindowId: uuidv4(),
  windows: []
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
    updateObjectEditorData: (state, action: IUpdateObjectEditorData) => {
      // state.windows = state.windows.map((window: IWindow) => {
      //   if (!('data' in window)) {
      //     return window;
      //   }

      //   const path = action.payload.path.split(OBJECT_JSON_PATH_SEPERATOR);
      //   const newData = action.payload.data;
      //   const objectId = `${path[0]}`;
      //   for (let windowIndex = 0; windowIndex < state.windows.length; windowIndex++) {
      //     const windowObjectId = (state.windows[windowIndex] as IEditorWindow<any>).data.id;
      //     if (windowObjectId !== objectId) {
      //       continue;
      //     }

      //     let newWindow = state.windows[windowIndex] as IEditorWindow<IProgramObject>;
      //     const object = (state.windows[windowIndex] as IEditorWindow<IProgramObject>).editData;
      //     if (path[1] === "event") {

      //       for (let eventIndex = 0; eventIndex < object.events.length; eventIndex++) {
      //         const event = object.events[eventIndex];
      //         if (event.name !== path[2]) {
      //           continue;
      //         }

      //         if (path[3] === "color") {
      //           newWindow.data.events[eventIndex][path[3]] = newData;
      //         }
      //       }
      //       // console.log(`update ${action.payload.path}`)
      //       // console.log(action.payload.data);
      //     }
      //     return newWindow;
      //   }
      //   return window;
      // });

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
    }
  }
});

export const { openMenu, closeMenu, openObjectWindow, closeObjectWindow, updateObjectEditorData, openPreviewWindow } = guiSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default guiSlice.reducer;