import * as THREE from 'three';
import QuantaObject from './QuantaObject';
import Scope from '../types/Scope';

export default class QuantaScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private domElement: HTMLElement;
  private objects: Array<QuantaObject>;
  private startTime: number;
  private scope: Scope;

  constructor(domElement: HTMLElement) {
    this.startTime = new Date().getTime() / 1000;
    this.objects = new Array<QuantaObject>();
    this.domElement = domElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);

    this.scope = new Scope();
    this.scope.setVariable("seed", Math.random());
  }

  public addObject(item: QuantaObject) {
    this.scene.add(item.getMesh());
    this.objects.push(item);
  }

  public animate() {
    requestAnimationFrame(() => this.animate());
    let timeNow = new Date().getTime() / 1000;
    this.scope.setVariable("time", timeNow - this.startTime);

    this.objects.forEach((item: QuantaObject) => {
        item.update(this.scope);
    })

    this.renderer.render(this.scene, this.camera);
  }
}