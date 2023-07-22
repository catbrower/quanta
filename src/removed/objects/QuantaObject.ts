import * as THREE from 'three';
import Function from '../types/Function';
import Scope from '../types/Scope';
import Field4 from '../fields/Field4';

export default class QuantaObject {
  private mesh: any | null = null;
  private geometry: THREE.BufferGeometry | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private uniforms: any;

  public mouseOver: number;

  constructor() {
    this.mouseOver = 0.0;
    this.uniforms = {};

    return this;
  }

  public setGeometry(geometry: THREE.BufferGeometry) {
    this.geometry = geometry;
    return this;
  }

  public setMaterial(material: THREE.ShaderMaterial) {
    this.material = material;
    return this;
  }

  public setMesh(mesh: any) {
    this.mesh = mesh;
    return this;
  }

  public setUniforms(uniforms: any) {
    this.uniforms = uniforms;
    return this;
  }

  public setColor(color: Field4) {
    // this.color = color;
  }

  public setFunction(property: string, func: Function<any>) {
    // this.functions[property] = func;
  }

  public update(scope: Scope, raycaster: THREE.Raycaster): void {
    const intersects = raycaster.intersectObject(this.mesh);
    // if(intersects.length > 0) {
    //     if(this.material !== null && this.material.hasOwnProperty("uniforms") && this.material.uniforms.hasOwnProperty("mouseOver")) {
    //         this.material.uniforms.mouseOver.value = 1;
    //     }
    // } else {
    //     if(this.material !== null && this.material.hasOwnProperty("uniforms") && this.material.uniforms.hasOwnProperty("mouseOver")) {
    //         this.material.uniforms.mouseOver.value = 0;
    //     }
    // }
  }

  public getMaterial(): THREE.ShaderMaterial | null {
    return this.material;
  }

  public getMesh(): any {
    return this.mesh;
  }

  // TODO is this needed? Finish it
  public getAllProperties() {
    return {}
  }
}