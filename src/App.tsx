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
          name: 'test cube',
          id: 'sdfsdf',
          type: "points",
          texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/spark1.png",
          properties: {
            "f": {type: "float", value: 20.0},
            "a": {type: "float", value: 10.0}
          },
          geometry: {
            type: 'sphere',
            args: {"scale": 1, "widthSegments": 200, "heightSegments": 200}
          },
          color: 'pow(sin(0.5*time + position.y), 2.0), pow(sin(0.7*time + position.x), 2.0), pow(sin(0.3*time + position.z), 2.0), 1',
          // rotation: 'time / 2.0 + position.z, time / 2.0, time / 2.0',
          // scale: 'sin(time / 2.0) + 1.0, sin(time / 2.0) + 1.0, sin(time / 2.0) + 1.0',
          scale: "2.5 + sin(time + position.x * f) / a, 2.5 + sin(time + position.y * f) / a, 2.5 + sin(time + position.y * f) / a",
          // pointSize: "pow(sin(time + position.x + position.y), 2.0) * 20.0 + 20.0"
          pointSize: "2.0"
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
