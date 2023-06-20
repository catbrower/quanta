import * as THREE from 'three';
import QuantaObject from './QuantaObject';
import Scope from '../types/Scope';
import { buildObject } from '../ObjectBuilder';

export default class Universe {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private domElement: Node | null;
  private objects: Array<QuantaObject>;
  private startTime: number;
  private scope: Scope;

  constructor(universeParams: any) {
    this.domElement = document.evaluate(universeParams.meta.element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(this.domElement === null) {
      throw new Error("domElement cannot be null");
    }

    // Initial globals
    this.scope = new Scope();
    this.scope.setVariable("seed", Math.random());
    this.scope.setVariable("time", 0);

    this.scene = new THREE.Scene();
    this.objects = new Array<QuantaObject>();
    for(const objectSpec of universeParams.objects) {
      const obj = buildObject(objectSpec, this.scope);
      this.objects.push(obj);
      this.scene.add(obj.getMesh());
    }

    this.startTime = new Date().getTime() / 1000;
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement.appendChild(this.renderer.domElement);
  }

  // public addObject(item: QuantaObject) {
  //   this.scene.add(item.getMesh());
  //   this.objects.push(item);
  // }

  // Executes once, starts animation loop
  // exists for calling any functions that need to be before the loop starts
  public begin() {
    this.startTime = new Date().getTime()
    this.animationLoop();
  }

  private updateScope() {
    let timeNow = new Date().getTime();
    this.scope.setVariable("time", (timeNow - this.startTime) / 1000.0 * Math.PI);
  }

  private animationLoop() {
    requestAnimationFrame(() => this.animationLoop());

    this.updateScope();
    this.objects.forEach((item: QuantaObject) => {
        item.update(this.scope);
    })

    this.renderer.render(this.scene, this.camera);
  }
}