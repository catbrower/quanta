import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

import QuantaObject from './objects/QuantaObject';
import QuantaScene from './objects/QuantaScene';

class App extends React.Component {
  private scene: QuantaScene;

  constructor(props: {}) {
    super(props);
    let scene = new QuantaScene(document.body);
    let obj = new QuantaObject(new THREE.BoxGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
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
