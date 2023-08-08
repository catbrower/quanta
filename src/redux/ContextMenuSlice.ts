import { createSlice } from "@reduxjs/toolkit";

export interface IContextMenuState {
  type: string,
  payload: any,
  isOpen: boolean,
  anchor: any,
  x: number,
  y: number
}

interface ISetContextMenuAction {
  type: string,
  payload: IContextMenuState
}

const initialState: IContextMenuState = {
  type: "",
  payload: {},
  anchor: null,
  isOpen: false,
  x: 0,
  y: 0
}

export const contextMenuSlice = createSlice({
  name: 'contextMenuSlice',
  initialState,
  reducers: {
    setContextMenuState: (state, action: ISetContextMenuAction) => {
      state = action.payload;
    },
    setContextMenuArgs: (state, action) => {
      state.type = action.payload.type;
      state.payload = action.payload.payload;
    },
    setAnchor: (state, action) => {
      state.anchor = action.payload;
    },
    openContextMenu: (state, action) => {
      state.isOpen = true;
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
    closeContextMenu: (state) => {
      state.isOpen = false;
      state.type = "";
    }
  }
})

export const { setContextMenuState, setContextMenuArgs, setAnchor, openContextMenu, closeContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;