import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store";
import { IProgram } from "./Program";
import {v4 as uuidv4} from 'uuid';
import { useAppSelector } from "../Hooks";

const initialState: IProgram = {
    meta: {element: "/html/body"},
    globals: [
        {name: 'time'},
        {name: 'seed'},
        {name: 'pi'}
    ],
    objects: [{
        name: 'test cube',
        id: uuidv4(),
        mesh: {
          type: "mesh",
          args: {count: {type: "float", value: "10"}}
        },
        // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
        properties: {
          f: {type: "float", value: "1"},
          b: {type: "float", value: "0.25"}
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
          r: "pow(sin(time * b + position.x * f + pi/3.0), 2.0)",
          g: "pow(sin(time * b + position.y * f + pi*2.0/3.0), 2.0)",
          b: "pow(sin(time * b + position.z * f + pi), 2.0)",
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