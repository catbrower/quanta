import { createSlice } from "@reduxjs/toolkit";
import { IProgram, IProgramObject } from "../program/ProgramInterfaces";
import { EVENT_STEP_COLOR, EVENT_STEP_ROTATE, MESH_TYPE_DEFAULT } from "../Constants";
import { v4 as uuidv4 } from 'uuid';

// TODO need a way to reference aspects of mesh / geomeyry or set them based on props
const testCube: IProgramObject = {
  name: "Test Cube",
  id: "0",
  mesh: { type: MESH_TYPE_DEFAULT, args: {} },
  geometry: { type: "box", args: { scale: { type: "float", value: "5" } } },
  properties: { x: { type: "float", value: "0.2" } },
  events: [
    {
      name: "create",
      steps: [
        {
          type: EVENT_STEP_COLOR,
          id: uuidv4(),
          content: {
            r: "pow(sin(time + position.x * x + pi/3.0), 2.0)",
            g: "pow(sin(time + position.y * x + 2.0*pi/3.0), 2.0)",
            b: "pow(sin(time + position.z * x + pi), 2.0)",
            a: "1.0"
          }
        },
        {
          type: EVENT_STEP_ROTATE,
          id: uuidv4(),
          content: {
            x: "time",
            y: "time",
            z: "0.0"
          }
        }
      ]

    }
  ]
}

interface IProgramState {
  program: IProgram,
  compiledProgram: string | null
}

const initialState: IProgramState = {
  program: {
    meta: { element: "/html/body" },
    globals: {
      'time': { type: "float", value: "0.0" },
      "seed": { type: "float", value: "0.0" },
      "pi": { type: "float", value: `${Math.PI}` },
      "e": { type: "float", value: `${Math.E}` }
    },
    objects: [testCube]
  },
  compiledProgram: null
}

export const codeSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setMetaParams: (state, action) => { },
    addObject: (state, action) => {
      state.program.objects.push(action.payload)
    },
    removeObject: (state, action) => { },
    updateObject: (state, action) => {
      console.log(action.payload)
      for (let i = 0; i < state.program.objects.length; i++) {
        if (state.program.objects[i].id === action.payload.id) {
          state.program.objects[i] = action.payload;
        }
      }
    },
    setCompiledProgram: (state, action) => {
      state.compiledProgram = action.payload;
    },
    run: (state, action) => { }
  }
});

export const { setMetaParams, addObject, updateObject, removeObject, setCompiledProgram, run } = codeSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;

export default codeSlice.reducer;