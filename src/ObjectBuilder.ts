import {
    AdditiveBlending,
    BoxGeometry,
    BufferGeometry,
    DodecahedronGeometry,
    InstancedBufferAttribute,
    InstancedBufferGeometry,
    InstancedMesh,
    Mesh,
    MeshBasicMaterial,
    Points,
    ShaderMaterial,
    SphereGeometry,
    TetrahedronGeometry,
    TextureLoader, 
    Vector3} from "three";
import QuantaObject from './objects/QuantaObject';
import { fibonacciSphere } from "./Geometries";
import { box } from './InstanceGeometries';

export default class ObjectBuilder {
    // String constants
    private static ROTATION_X: string = "rotation_x";
    private static ROTATION_Y: string = "rotation_y";
    private static ROTATION_Z: string = "rotation_z";    
    private static TRANSLATION_X: string = "translation_x";
    private static TRANSLATION_Y: string = "translation_y";    
    private static TRANSLATION_Z: string = "translation_z";
    private static SCALE_X: string = "scale_x";    
    private static SCALE_Y: string = "scale_y";
    private static SCALE_Z: string = "scale_z";
    private static ROTATION_MATRIX_X: string = "rotation_matrix_x";
    private static ROTATION_MATRIX_Y: string = "rotation_matrix_y";
    private static ROTATION_MATRIX_Z: string = "rotation_matrix_z";
    private static TRANSLATION_MATRIX: string = "translation_matrix";
    private static SCALE_MATRIX: string = "scale_matrix";

    private rotationMatricies = `
        // Rotation
        float srx = cos(${ObjectBuilder.ROTATION_X});
        float crx = sin(${ObjectBuilder.ROTATION_X});
        float sry = cos(${ObjectBuilder.ROTATION_Y});
        float cry = sin(${ObjectBuilder.ROTATION_Y});
        float srz = cos(${ObjectBuilder.ROTATION_Z});
        float crz = sin(${ObjectBuilder.ROTATION_Z});

        mat4 ${ObjectBuilder.ROTATION_MATRIX_X} = mat4(
            vec4(1.0, 0.0,  0.0, 0.0), 
            vec4(0.0, crx, -srx, 0.0), 
            vec4(0.0, srx,  crx, 0.0), 
            vec4(0.0, 0.0,  0.0, 1.0)
        );

        mat4 ${ObjectBuilder.ROTATION_MATRIX_Y} = mat4(
            vec4( cry, 0.0, sry, 0.0), 
            vec4( 0.0, 1.0, 0.0, 0.0), 
            vec4(-sry, 0.0, cry, 0.0), 
            vec4( 0.0, 0.0, 0.0, 1.0)
        );

        mat4 ${ObjectBuilder.ROTATION_MATRIX_Z} = mat4(
            vec4(crz, -srz, 0.0, 0.0), 
            vec4(srz,  crz, 0.0, 0.0), 
            vec4(0.0,  0.0, 1.0, 0.0), 
            vec4(0.0,  0.0, 0.0, 1.0)
        );
    `;

    private translationMatricies = `
        // Translation
        mat4 ${ObjectBuilder.TRANSLATION_MATRIX} = mat4(
            vec4(1.0, 0.0, 0.0, 0.0), 
            vec4(0.0, 1.0, 0.0, 0.0), 
            vec4(0.0, 0.0, 1.0, 0.0), 
            vec4(${ObjectBuilder.TRANSLATION_X}, ${ObjectBuilder.TRANSLATION_Y}, ${ObjectBuilder.TRANSLATION_Z}, 1.0)
        );
    `;

    private scaleMatricies = `
        // Scale
        mat4 ${ObjectBuilder.SCALE_MATRIX} = mat4(
            vec4(${ObjectBuilder.SCALE_X}, 0.0, 0.0, 0.0), 
            vec4(0.0, ${ObjectBuilder.SCALE_Y}, 0.0, 0.0), 
            vec4(0.0, 0.0, ${ObjectBuilder.SCALE_Z}, 0.0), 
            vec4(0.0, 0.0, 0.0, 1.0)
        );
    `;

    private quantaObject: QuantaObject;
    private objectSpec: any;
    private uniforms: any;
    private scope: any;

    private commonHeader: string = `
        varying vec3 vUv;
    `;

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
    private geomertyArgs: any;
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

    private buildTransformationMatricies(): string {
        if(!this.hasTransformation) {
            return "";
        }

        return `
            ${this.hasRotation ? this.rotationMatricies : ""}
            ${this.hasTranslation ? this.translationMatricies : ""}
            ${this.hasScale ? this.scaleMatricies : ""}
        `
    }

    private buildFragmentShader(): string {
        let uniformsStr = Object.entries(this.uniforms).map((item: any) => {
            return `uniform ${item[1].type} ${item[0]};`
        }).join("\n");

        let result =  `
            ${this.commonHeader}
            ${uniformsStr}
            
            varying vec3 vInstancePosition;
            void main() {
                vec3 position = vUv;
                float color_r = ${this.color.r};
                float color_g = ${this.color.g};
                float color_b = ${this.color.b};
                float color_a = ${this.color.a};

                // put events here
                ${this.hasMouseOver ? `
                    if(mouseOver == 1.0) {
                        ${this.objectSpec.events.mouseOver}
                    }
                ` : ""}

                gl_FragColor = vec4(color_r, color_g, color_b, color_a);
                ${this.hasTexture ? "gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);" : ""}
            }
        `;
        
        return result;
    }

    private buildVertexShader(): string {
        let uniformsStr = Object.entries(this.uniforms).map((item: any) => {
            return `uniform ${item[1].type} ${item[0]};`
        }).join("\n");

        // TODO instanceMatrixIsRequired, must use a flag to detect instancing
        // TODO apparently modelViewMatrix isn't set for instancing, instead use viewMatrix * modelMatrix
        let vPosition: string[] = ["projectionMatrix", "modelViewMatrix", "instanceMatrix"];
        // let vPosition: string[] = ["projectionMatrix", "instanceMatrix"];
        if(this.hasRotation) {
            vPosition.push(ObjectBuilder.ROTATION_MATRIX_X, ObjectBuilder.ROTATION_MATRIX_Y, ObjectBuilder.ROTATION_MATRIX_Z);
        }

        if(this.hasTranslation) {
            vPosition.push(ObjectBuilder.TRANSLATION_MATRIX);
        }

        if(this.hasScale) {
            vPosition.push(ObjectBuilder.SCALE_MATRIX);
        }

        vPosition.push("vec4(position, 1.0)");

        let result = `
            ${this.commonHeader}
            varying vec4 modelViewPosition;
            varying vec4 instancePosition;
            ${this.hasTransformation ? "varying mat4 vPosition;" : ""}
            ${uniformsStr}

            varying vec3 vInstancePosition;
            void main() {
                vUv = position;
                vec3 vInstancePosition = (instanceMatrix * vec4(position.x, position.y, position.z, 1.0)).xyz;
                
                ${this.hasRotation ? `
                    float rotation_x = ${this.rotation.x};
                    float rotation_y = ${this.rotation.y};
                    float rotation_z = ${this.rotation.z};
                `: ""}

                ${this.hasTranslation ? `
                    float translation_x = ${this.translation.x};
                    float translation_y = ${this.translation.y};
                    float translation_z = ${this.translation.z};
                `: ""}

                ${this.hasScale ? `
                    float scale_x = ${this.scale.x};
                    float scale_y = ${this.scale.y};
                    float scale_z = ${this.scale.z};
                `: ""}

                ${this.buildTransformationMatricies()}
                // vUv = position;
                
                ${
                    this.objectSpec.hasOwnProperty("pointSize") && this.meshType === "points" ?
                        `gl_PointSize = ${this.objectSpec.pointSize};` : ""
                }

                gl_Position = ${vPosition.join(" * ")};
            }
        `;

        return result;
    }

    private buildGeometry(): BufferGeometry {
        let geometry: BufferGeometry;
        // TODO: force lowercase
        // TODO: actually handle geometry args
        let scale = this.geomertyArgs.scale;
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
                    this.geomertyArgs.widthSegments,
                    this.geomertyArgs.heightSegments
                );
                break;
            case "fibSphere":
                geometry = fibonacciSphere(
                    scale,
                    this.geomertyArgs.numPoints);
                break;
            default:
                throw new Error(`Unsupported geometry ${this.geometryType}`)
        }

        return geometry;
    }

    private buildMaterial(): any {
        let material: ShaderMaterial = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.buildVertexShader(),
            fragmentShader: this.buildFragmentShader(),
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