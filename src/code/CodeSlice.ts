import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";
import { IProgram } from "./Program";

const initialState: IProgram = {
    meta: {element: "/html/body"},
    globals: [
        {name: 'time'},
        {name: 'seed'}
    ],
    objects: [{
        name: 'test object',
        id: 'sdfsdf',
        mesh: {
          type: "mesh",
          args: {count: {type: "float", value: "10"}}
        },
        // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
        properties: {
          f: {type: "float", value: "20"},
          b: {type: "float", value: "0.5"}
          // overIncrease: {type: "float", value: "0.75"}
        },
        geometry: {
          type: 'box',
          args: {
            scale: {type: "float", value: "0.25"},
            numPoints: {type: "float", value: "10"}
          }
        },
        color: {
          r: "sin(time * b + position.x * f)",
          g: "sin(time * b + position.y * f)",
          b: "sin(time * b + position.z * f)",
          a: "1.0"
        },
        rotation: {
          x: "time / 10.0",
          y: "time / 12.0",
          z: "time / 11.0"
        },
        scale: {
          x: "15.5",
          y: "15.5",
          z: "15.5"
        },
        pointSize: "1.0",
        // events: {
        //   mouseOver: `
        //     color_r = color_r + overIncrease;
        //     color_g = color_g + overIncrease;
        //     color_b = color_b + 0.5;

        //   `
        // }

        // material: {
        //   onBeforeCompile: function(shader: any) {
        //     console.log(shader.fragmentShader);
        //   }
        // }
      }]
}

export const codeSlice = createSlice({
    name: "codeSlice",
    initialState,
    reducers: {
        setMetaParams: (state, action) => {},
        addObject: (state, action) => {state.objects.push(action.payload)},
        removeObject: (state, action) => {},
        updateObject: (state, action) => {}
    }
});

export const { addObject } = codeSlice.actions;
// export const getWindows = (state: RootState) => state.gui.windows;
export default codeSlice.reducer;