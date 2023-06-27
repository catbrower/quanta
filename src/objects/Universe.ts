import * as THREE from 'three';
import QuantaObject from './QuantaObject';
import Scope from '../types/Scope';
import ObjectBuilder from '../ObjectBuilder';
import $ from "jquery";
import { Program } from '../Program';

export default class Universe {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private domElement: Node | null;
  private objects: Array<QuantaObject>;
  private startTime: number;
  private scope: Scope;
  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;

  constructor(universeParams: Program) {
    this.domElement = document.evaluate(universeParams.meta.element, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(this.domElement === null) {
      throw new Error("domElement cannot be null");
    }

    // Initial globals
    this.scope = new Scope();
    this.scope.setVariable("seed", Math.random());
    this.scope.setVariable("time", 0);
    this.scope.setVariable("mouse_x", 0);
    this.scope.setVariable("mouse_y", 0);

    this.scene = new THREE.Scene();
    this.objects = new Array<QuantaObject>();
    for(const objectSpec of universeParams.objects) {
      const objectBuilder = new ObjectBuilder(objectSpec, this.scope);
      const obj = objectBuilder.build();
      this.objects.push(obj);
      this.scene.add(obj.getMesh());
    }

    this.startTime = new Date().getTime() / 1000;
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 10;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas") as HTMLCanvasElement,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // Events
    document.addEventListener("pointermove", (event) => { this.onPointerMove(event) });
  }

  public addObject(item: QuantaObject) {
    // this.scene.add(item.getMesh());
    // this.objects.push(item);
  }

  // Executes once, starts animation loop
  // exists for calling any functions that need to be before the loop starts
  public begin() {
    this.startTime = new Date().getTime()
    this.animationLoop();

    // console.log(this.objects[0].a)
  }

  private updateScope() {
    let timeNow = new Date().getTime();
    this.scope.setVariable("time", (timeNow - this.startTime) / 1000.0 * Math.PI);
    this.scope.setVariable("mouse_x", this.pointer.x);
    this.scope.setVariable("mouse_y", this.pointer.y);
  }

  private animationLoop() {
    requestAnimationFrame(() => this.animationLoop());

    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.updateScope();
    this.objects.forEach((item: QuantaObject) => {
        item.update(this.scope, this.raycaster);
    })

    this.renderer.render(this.scene, this.camera);
  }


  // Events
  public onPointerMove(event: any) {
    this.pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
  }
}