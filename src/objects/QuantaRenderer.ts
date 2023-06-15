import * as THREE from 'three';
import QuantaObject from './QuantaObject';

export default class QuantaScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private domElement: HTMLElement;
  private objects: Array<QuantaObject>;
  private startTime: number;

  constructor(domElement: HTMLElement) {
    this.startTime = 0;
    this.objects = new Array<QuantaObject>();
    this.domElement = domElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);
  }

  private addObject(item: QuantaObject) {
    this.scene.add(item.getMesh());
    this.objects.push(item);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    const state = {
        time: 0,
        seed: 0
    }

    this.objects.forEach((item: QuantaObject) => {
        item.update(state);
    })

    this.renderer.render(this.scene, this.camera);
  }
}