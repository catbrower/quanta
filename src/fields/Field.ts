import * as THREE from 'three';

export default class Field {
    private name: string;
    private uniforms: any;

    constructor(name: string) {
        this.name = name;
        this.uniforms = {
            // colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
            // colorA: {type: 'vec3', value: new THREE.Color(0x74EBD5)}
        }
    }

    public getShaderMaterial() {
        return new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: this.getFramentShader(),
            vertexShader: this.getVertexShader()
        });
    }

    private buildShaderUniformString() {
        if(Object.keys(this.uniforms).length < 1) {
            return '';
        }

        let unifomStrings = [];
        for(const key in this.uniforms) {
            const { type, value } = this.uniforms[key];
            unifomStrings.push(`uniform ${type} ${key};`);
        }

        return unifomStrings.reduce((acc: string, cur: string): string => {
            return `${acc}\n${cur}`;
        });
    }

    public setUniform(name: string, type: string, value: any) {
        this.uniforms[name] = {type: type, value: value};
    }

    public getFramentShader() {
        let uniforms = this.buildShaderUniformString();
        return `
            ${uniforms}
            varying vec3 vUv;

            void main() {
                // gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
        `
    }

    public getVertexShader() {
        let uniforms = this.buildShaderUniformString();
        return `
            ${uniforms}
            varying vec3 vUv;
            varying vec4 modelViewPosition;

            void main() {
                vUv = position;
                vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * modelViewPosition;
            }
        `
    }
}