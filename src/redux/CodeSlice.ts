import { createSlice } from "@reduxjs/toolkit";
import { IProgram, IProgramObject } from "../program/Interfaces";

const testCube: IProgramObject = {
  name: "Test Cube",
  id: "0",
  mesh: { type: 0, args: {} },
  geometry: { type: "box", args: {scale: { type: "float", value: "15" }} },
  properties: {},
  events: [
    {
      name: "create",
      color: {
        r: "pow(sin(time + position.x))",
        g: "1",
        b: "1",
        a: "1"
      }
    }
  ]
}

interface IProgramState {
  program: IProgram,
  compiledProgram: string | null
}

const initialState: IProgramState = {
  program: {
    meta: {element: "/html/body"},
    globals: {
        'time': {type: "float", value: "0.0"},
        "seed": {type: "float", value: "0.0"},
        "pi": {type: "float", value: `${Math.PI}`},
        "e": {type: "float", value: `${Math.E}`}
    },
    objects: [testCube]
  },
  compiledProgram: null
}

export const codeSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setMetaParams: (state, action) => {},
    addObject: (state, action) => {
      state.program.objects.push(action.payload)
    },
    removeObject: (state, action) => {},
    updateObject: (state, action) => {

    },
    setCompiledProgram: (state, action) => {
      state.compiledProgram = action.payload;
    },
    run: (state, action) => {}
  }
});

export const { setMetaParams, addObject, updateObject, removeObject, setCompiledProgram, run } = codeSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;

export default codeSlice.reducer;