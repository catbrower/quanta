import React from 'react';
import './App.css';
import * as THREE from 'three';

import QuantaObject from './objects/QuantaObject';
import Universe from './objects/Universe';
import Function from './types/Function';
import Scope from './types/Scope';
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
          properties: {},
          geometry: {
            type: 'sphere',
            args: ['1']
          },
          color: 'pow(sin(1.7*time + position.y), 2.0), pow(sin(0.7*time + position.x), 2.0), pow(sin(1.3*time + position.z), 2.0), 0.01',
          rotation: '0.0, time / 2.0, 0.0',
          // scale: 'sin(time / 2.0) + 1.0, sin(time / 2.0) + 1.0, sin(time / 2.0) + 1.0',
          scale: "2.0, 2.0, 2.0",
          pointSize: "pow(sin(time + position.x + position.y), 2.0) * 20.0 + 20.0"
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
