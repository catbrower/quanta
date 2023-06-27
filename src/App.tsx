import React from 'react';
import './App.css';
import Universe from './objects/Universe';
import Field from './fields/Field';
import GUI from './gui/GUI';
import { Program } from './Program';

class App extends React.Component {
  private universe: Universe | null = null;

  constructor(props: {}) {
    super(props);
  }

  createUniverse() {
    const universeParams: Program = {
      meta: {
        element: "/html/body"
      },
      globals: [
        {name: 'time'},
        {name: 'seed'}
      ],
      objects: [
        {
          name: 'test object',
          id: 'sdfsdf',
          mesh: {
            type: "instance",
            args: {count: {type: "float", value: "10"}}
          },
          // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
          properties: {
            f: {type: "float", value: "0.25"},
            overIncrease: {type: "float", value: "0.75"}
          },
          geometry: {
            type: 'box',
            args: {
              scale: {type: "float", value: "0.25"},
              numPoints: {type: "float", value: "10"}
            }
          },
          color: {
            r: "position.x",
            g: "position.x",
            b: "position.x",
            a: "1.0"
          },
          scale: {
            x: "0.5",
            y: "0.5",
            z: "0.5"
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
        }
      ]
    }

    this.universe = new Universe(universeParams);
    this.universe.begin();
  }

  componentDidMount(): void {
      this.createUniverse();
  }

  render() {
    return (
      <>
        <GUI />
        <canvas id="canvas"></canvas>
      </>
    )
  }
  
}

export default App;
