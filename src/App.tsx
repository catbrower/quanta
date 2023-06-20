import React from 'react';
import './App.css';
import Universe from './objects/Universe';
import Field from './fields/Field';

class App extends React.Component {
  private universe: Universe;

  constructor(props: {}) {
    super(props);
    
    let fieldColor = new Field('colorShader');

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
            args: {"scale": 1.1, "numPoints": Math.pow(2, 13)}
          },
          rotation: "time / 25.0, time / 25.0, time / 25.0",
          color: 'pow(sin(0.5*time + position.y), 2.0), pow(sin(0.7*time + position.x), 2.0), pow(sin(0.3*time + position.z), 2.0), 0.02',
          scale: "s + sin(1.1*time*t + position.x * f) * a, s + sin(1.2*time*t + position.y * f) * a, s+ sin(time*t + position.z * f) * a",
          pointSize: "60.0"
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
          type: "mesh",
          // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
          properties: {},
          geometry: {
            type: 'box',
            args: {"scale": 1}
          },
          // translate: "mouse_x, mouse_y, 1.0",
          rotation: "time / 25.0, time / 25.0, time / 25.0",
          color: 'pow(sin(0.5*time + position.y), 2.0), pow(sin(0.7*time + position.x), 2.0), pow(sin(0.3*time + position.z), 2.0), 1',
          // scale: "s + sin(1.1*time*t + position.x * f) * a, s + sin(1.2*time*t + position.y * f) * a, s+ sin(time*t + position.z * f) * a",
          // pointSize: "60.0",
          events: {
            mouseOver: ``
          }
        }
      ],
      fields: []
    }

    this.universe = new Universe(universeParams);
  }

  componentDidMount(): void {
      this.universe.begin();
  }

  render() {
    return (
      <></>
    )
  }
  
}

export default App;
