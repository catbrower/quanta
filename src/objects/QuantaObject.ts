import * as THREE from 'three';
import Function from '../types/Function';
import Scope from '../types/Scope';
import Field4 from '../fields/Field4';

export default class QuantaObject {
    private mesh: any;
    private geometry: THREE.BufferGeometry;
    private material: THREE.ShaderMaterial;
    private eventVariables: any;

    private mouseOver: boolean;

    constructor(mesh: any, geometry: THREE.BufferGeometry, material: THREE.ShaderMaterial) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = mesh;
        this.mouseOver = false;
        this.eventVariables = {};
    }

    public setEventVariables(eventVariables: any) {
        this.eventVariables = eventVariables;
    }

    public setColor(color: Field4) {
        // this.color = color;
    }

    public setFunction(property: string, func: Function<any>) {
        // this.functions[property] = func;
    }

    public update(scope: Scope, raycaster: THREE.Raycaster): void {
        const intersects = raycaster.intersectObject(this.mesh);
        if(intersects.length > 0) {
            // console.log("intersects");
        //     this.mouseOver = true;
        //     // this.geometry.scale(2, 2, 2);
        // } else {
        //     this.mouseOver = false;
        }
        // this.material.uniforms.time.value = scope.getVariable("time");
        // for(const [key, value] of Object.entries(this.functions)) {
        //     let delta = value.evaluate(scope);
            
        //     // TODO there's got to be a better way!
        //     switch(key) {
        //         case "rotation":
        //             this.mesh.rotation.setFromVector3(delta);
        //             break;
        //         case "position":
        //             this.mesh.position.set(delta.x, delta.y, delta.z);
        //             break;
        //         // case "color":
        //         //     this.material.color.setFromVector3(delta);
        //         //     break;
        //     }
        // };
    }

    public getMesh(): any {
        return this.mesh;
    }

    // TODO is this needed? Finish it
    public getAllProperties() {
        return {}
    }
}