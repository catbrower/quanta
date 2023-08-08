import { createSlice } from "@reduxjs/toolkit";
import { IProgram, IProgramObject } from "../program/ProgramInterfaces";
import { EVENTS, EVENT_STEPS, MATERIAL_TYPES, MESH_TYPE_DEFAULT } from "../Constants";
import { v4 as uuidv4 } from 'uuid';
import { getDefaultObject } from "../program/builder/ObjectBuilder";

// TODO need a way to reference aspects of mesh / geomeyry or set them based on props
const testCube: IProgramObject = {
  name: "Test Cube",
  id: uuidv4(),
  mesh: { type: MESH_TYPE_DEFAULT, args: {} },
  geometry: { type: "box", args: { scale: { type: "float", value: "5" } } },
  material: { type: MATERIAL_TYPES.BASIC },
  properties: { x: { type: "float", value: "0.2" } },
  events: {
    [EVENTS.STEP]: {
      name: EVENTS.STEP,
      steps: [
        {
          type: EVENT_STEPS.SET_COLOR,
          id: uuidv4(),
          content: {
            r: "pow(sin(uniforms.time.value), 2)",
            g: "0.01",
            b: "Math.PI / 10",
            a: "1.0"
          }
        }
      ]
    },
  }
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
    addObject: (state) => {
      state.program.objects.push(getDefaultObject())
    },
    removeObject: (state, action) => {
      state.program.objects = state.program.objects.filter((obj: IProgramObject) => obj.id !== action.payload);
    },
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