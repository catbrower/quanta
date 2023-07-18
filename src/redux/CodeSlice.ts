import { createSlice } from "@reduxjs/toolkit";
import { IProgram } from "../program/Interfaces";
import {v4 as uuidv4} from 'uuid';

const initialState: IProgram = {
    meta: {element: "/html/body"},
    globals: {
        'time': {type: "float", value: "0.0"},
        "seed": {type: "float", value: "0.0"},
        "pi": {type: "float", value: `${Math.PI}`},
        "e": {type: "float", value: `${Math.E}`}
    },
    objects: []
}

export const codeSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setMetaParams: (state, action) => {},
    addObject: (state, action) => {state.objects.push(action.payload)},
    removeObject: (state, action) => {},
    updateObject: (state, action) => {

    },
    build: (state) => {
      // https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
    },
    run: (state, action) => {}
  }
});

export const { setMetaParams, addObject, updateObject, removeObject, build, run } = codeSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;

export default codeSlice.reducer;