import * as THREE from 'three';
import Function from '../types/Function';
import { FunctionDictionary } from '../types/FunctionDictionary';
import Scope from '../types/Scope';

export default class QuantaObject {
    private mesh: THREE.Mesh;
    private geometry: THREE.BufferGeometry;
    private material: THREE.MeshBasicMaterial;

    private functions: FunctionDictionary;
    private mutableProperties = []

    constructor(geometry: THREE.BufferGeometry, material: THREE.MeshBasicMaterial) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.functions = {}
    }

    public setFunction(property: string, func: Function<any>) {
        this.functions[property] = func;
    }

    public update(scope: Scope): void {
        for(const [key, value] of Object.entries(this.functions)) {
            let delta = value.evaluate(scope);
            
            // TODO there's got to be a better way!
            switch(key) {
                case "rotation":
                    this.mesh.rotation.setFromVector3(delta);
                    break;
                case "position":
                    this.mesh.position.set(delta.x, delta.y, delta.z);
                    break;
                case "color":
                    this.material.color.setFromVector3(delta);
                    break;
            }
        };
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }
}