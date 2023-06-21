import React from 'react';
import './App.css';
import Universe from './objects/Universe';
import Field from './fields/Field';

class App extends React.Component {
  private universe: Universe | null = null;

  constructor(props: {}) {
    super(props);
  }

  createUniverse() {
    // Note: any obj properties should be specified like a uniform
    const prettyUniverseParams = {
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
          type: "points",
          texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
          properties: {
            "f": {type: "float", value: 10.0},
            "a": {type: "float", value: 0.2},
            "s": {type: "float", value: 2.5},
            "t": {type: "float", value: 0.5}
          },
          geometry: {
            type: 'fibSphere',
            args: {"scale": 2.5, "numPoints": Math.pow(2, 13)}
          },
          rotation: {
            x: "time / 25.0",
            y: "time / 25.0",
            z: "time / 25.0"
          },
          color: {
            r: "pow(sin(0.5*time + position.y * 0.5), 2.0) * (1.0 - sqrt(pow(mouse_x, 2.0)))",
            g: "pow(sin(0.7*time + position.x * 0.5), 2.0) * (1.0 - sqrt(pow(mouse_y, 2.0)))",
            b: "pow(sin(0.3*time + position.z * 0.5), 2.0) * (1.0 - sqrt(pow(mouse_x, 2.0) + pow(mouse_y, 2.0)))",
            a: "0.02 * (position.x + 1.75)"
          },
          // scale: "s + sin(1.1*time*t + position.x * f) * a, s + sin(1.2*time*t + position.y * f) * a, s+ sin(time*t + position.z * f) * a",
          pointSize: "100.0"
        }
      ],
      fields: []
    }

    const universeParams = {
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
            type: "mesh",
            args: {}
          },
          // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
          properties: {},
          // attributes: {test: },
          geometry: {
            type: 'box',
            args: {"scale": 2.5, numPoints: 10}
          },
          // translate: "mouse_x, mouse_y, 1.0",
          rotation: {
            x: "time / 10.0",
            y: "time / 10.0",
            z: "time / 10.0"
          },
          color: {
            r: 'pow(sin(0.5*time + position.y), 2.0)',
            g: 'pow(sin(0.7*time + position.x), 2.0)',
            b: 'pow(sin(0.3*time + position.z), 2.0)',
            // r: `1.0`,
            // g: `1.0`,
            // b: "1.0",
            a: '1.0'
          },
          // scale: "s + sin(1.1*time*t + position.x * f) * a, s + sin(1.2*time*t + position.y * f) * a, s+ sin(time*t + position.z * f) * a",
          // pointSize: "60.0",
          events: {
            mouseOver: `
              color_r = color_r + 0.5;
              color_g = color_g + 0.5;
              color_b = color_b + 0.5;

            `
          }
        }
      ],
      fields: []
    }

    this.universe = new Universe(universeParams);
    this.universe.begin();
  }

  componentDidMount(): void {
      this.createUniverse();
  }

  render() {
    return (
      <><canvas id="canvas"></canvas></>
    )
  }
  
}

export default App;
