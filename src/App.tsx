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
          properties: {},
          geometry: {
            type: 'box',
            args: ['1']
          },
          color: 'pow(sin(1.7*time), 2.0), pow(sin(0.7*time), 2.0), pow(sin(1.3*time), 2.0), 1',
          rotation: 'time, time, time',
          translate: 'sin(time), cos(time), 0.0',
          scale: 'sin(time) + 1.0, sin(time) + 1.0, sin(time) + 1.0'
        }
      ],
      fields: []
    }

    // let obj = new QuantaObject(new THREE.BoxGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    // let obj = new QuantaObject(new THREE.BoxGeometry(1));
    // obj.setFunction("rotation", new Function<THREE.Vector3>(
    //   (scope: Scope) => {return new THREE.Vector3(0, scope.getVariable("time"), Math.sin(scope.getVariable("time")))}
    // ));
    // obj.setFunction("color", new Function<THREE.Vector3>(
    //   (scope: Scope) => {return new THREE.Vector3(Math.sin(scope.getVariable("time")), 0, 1)}
    // ));

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
