import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

import QuantaObject from './objects/QuantaObject';
import QuantaScene from './objects/QuantaScene';
import Function from './types/Function';
import Scope from './types/Scope';

class App extends React.Component {
  private scene: QuantaScene;

  constructor(props: {}) {
    super(props);
    
    let obj = new QuantaObject(new THREE.BoxGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    obj.setFunction("rotation", new Function<THREE.Vector3>(
      (scope: Scope) => {return new THREE.Vector3(0, scope.getVariable("time"), Math.sin(scope.getVariable("time")))}
    ));
    obj.setFunction("color", new Function<THREE.Vector3>(
      (scope: Scope) => {return new THREE.Vector3(Math.sin(scope.getVariable("time")), 0, 1)}
    ));

    let scene = new QuantaScene(document.body);
    scene.addObject(obj);
    this.scene = scene;
  }

  componentDidMount(): void {
      this.scene.animate();
  }

  render() {
    return (
      <></>
    )
  }
  
}

export default App;
