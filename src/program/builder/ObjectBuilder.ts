import {
    AdditiveBlending,
    BoxGeometry,
    BufferGeometry,
    DodecahedronGeometry,
    InstancedMesh,
    Mesh,
    Points,
    ShaderMaterial,
    SphereGeometry,
    TetrahedronGeometry,
    TextureLoader, 
} from "three";
import QuantaObject from '../../removed/objects/QuantaObject';
import { box } from '../InstanceGeometries';
import { IProgramObject, IProgramUniforms } from "../Interfaces";``
import { fibonacciSphere } from "../Geometries";

class ObjectBuilder {
    private quantaObject: QuantaObject;
    private objectSpec: any;
    private uniforms: IProgramUniforms;
    private scope: any;

    // Default Properties
    private blending = AdditiveBlending;
    private depthTest = false;
    private transparent = true;
    private rotation = {x: "1.0", y: "1.0", z: "1.0"};
    private translation = {x: "0.0", y: "0.0", z: "0.0"};
    private scale = {x: "0.0", y: "0.0", z: "0.0"};
    private color = {r: "1.0", g: "1.0", b: "1.0", a: "1.0"};

    // Required Properties
    private geometryType: string;
    private geomertyArgs: IProgramUniforms;
    private meshType: string;
    private meshArgs: any;

    // Flags
    private hasEvents: boolean = false;
    private hasTransformation: boolean = false;
    private hasRotation: boolean = false;
    private hasTranslation: boolean = false;
    private hasScale: boolean = false;
    private hasColor: boolean = false;
    private hasTexture: boolean = false;
    private hasMouseOver: boolean = false;

    constructor(objectSpec: any, scope: any = {}) {
        this.quantaObject = new QuantaObject();
        this.objectSpec = objectSpec;
        this.uniforms = {};

        // Required Properties
        this.geometryType = objectSpec.geometry.type;
        this.geomertyArgs = objectSpec.geometry.args;
        this.meshType = objectSpec.mesh.type;
        this.meshArgs = objectSpec.mesh.args;
        this.scope = scope;
    }

    public build(): QuantaObject {
        this.determineOptionalProperties();
        this.buildUniforms();

        let geometry: BufferGeometry = this.buildGeometry();
        let material: ShaderMaterial = this.buildMaterial();
        let mesh = this.buildMesh(geometry, material);

        this.quantaObject
            .setGeometry(geometry)
            .setMaterial(material)
            .setMesh(mesh)
            .setUniforms(this.uniforms);

        return this.quantaObject;
    }

    private determineOptionalProperties() {
        // Set flags
        this.hasRotation = this.objectSpec.hasOwnProperty("rotation");
        this.hasTranslation = this.objectSpec.hasOwnProperty("translate");
        this.hasScale = this.objectSpec.hasOwnProperty("scale");
        this.hasTransformation = this.hasRotation || this.hasTranslation || this.hasScale;
        this.hasColor = this.objectSpec.hasOwnProperty("color");
        this.hasTexture = this.objectSpec.hasOwnProperty("texture");

        if(this.objectSpec.hasOwnProperty("events")) {
            this.hasMouseOver = this.objectSpec.events.hasOwnProperty("mouseOver");
        }

        // Properties
        if(this.hasColor) { this.color = this.objectSpec.color }
        if(this.hasRotation) { this.rotation = this.objectSpec.rotation }
        if(this.hasTranslation) { this.translation = this.objectSpec.translate }
        if(this.hasScale) { this.scale = this.objectSpec.scale }
    }

    private buildUniforms(): any {
        let eventVariables: any = {};
        if(this.hasMouseOver) {
            eventVariables.mouseOver = {value: this.quantaObject.mouseOver, type: "float"}
        }

        let uniforms = Object.assign(
            this.scope.getAllVariables(),
            this.objectSpec.properties || {},
            eventVariables
        );
        if(this.objectSpec.hasOwnProperty("texture")) {
            uniforms.pointTexture = {value: new TextureLoader().load(this.objectSpec.texture), type: "sampler2D"}
        }

        this.uniforms = uniforms;
    }    

    private buildGeometry(): BufferGeometry {
        let geometry: BufferGeometry;
        // TODO: force lowercase
        // TODO: actually handle geometry args
        let geomertyArgs: IProgramUniforms = this.geomertyArgs;
        let scale: number = parseFloat(geomertyArgs.scale.value);
        
        switch(this.geometryType) {
            case "box":
                geometry = new BoxGeometry(scale, scale, scale);
                break;
            case "tetrahedron":
                geometry = new TetrahedronGeometry(scale);
                break;
            case "dodecahedron":
                geometry = new DodecahedronGeometry(scale);
                break;
            case "sphere":
                geometry = new SphereGeometry(
                    scale,
                    parseFloat(geomertyArgs.widthSegments.value),
                    parseFloat(geomertyArgs.heightSegments.value)
                );
                break;
            case "fibSphere":
                geometry = fibonacciSphere(
                    scale,
                    parseFloat(geomertyArgs.numPoints.value));
                break;
            default:
                throw new Error(`Unsupported geometry ${this.geometryType}`)
        }

        return geometry;
    }

    private buildMaterial(): any {
        let material: ShaderMaterial = new ShaderMaterial({
            uniforms: this.uniforms,
            // vertexShader: this.buildVertexShader(),
            // fragmentShader: this.buildFragmentShader(),
            blending: this.blending,
            depthTest: this.depthTest,
            transparent: this.transparent
        });

        if(this.objectSpec.hasOwnProperty("material") && this.objectSpec.material.hasOwnProperty("onBeforeCompile")) {
            material.onBeforeCompile = this.objectSpec.material.onBeforeCompile;
        }

        return material;
    }

    private buildMesh(geometry: BufferGeometry, material: ShaderMaterial) {
        switch(this.meshType) {
            case "mesh":
                return new Mesh(geometry, material);
            case "points":
                return new Points(geometry, material);
            case "instance":
                // let x = geometry.attributes.position
                // geometry = new InstancedBufferGeometry();
                // geometry.setAttribute("position", x);
                // geometry.setAttribute("testAttr", new InstancedBufferAttribute(new Float32Array[
                //     1.0, 1.0, 1.0
                // ]), 3);
                let result = new InstancedMesh(geometry, material, 1000);
                box(result, 10, 10, 10);
                return result;
            default:
                throw new Error(`Unknown mesh type: ${this.meshType}`);
        }
    }
}

export default function buildObject(objectSpec: IProgramObject): string {
    const blending = AdditiveBlending;
    const depthTest = false;
    const transparent = true;

    return `(() => {
      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertextShader: SHADERS["vertex.${objectSpec.id}.create"],
        fragmentShader: SHADERS["fragment.${objectSpec.id}.create"],
        blending: ${blending},
        depthTest: ${depthTest},
        transparent: ${transparent}
      });

      ver geometry = new THREE.BufferGeometry
    })();`;
}