import { AdditiveBlending, BoxGeometry, BufferGeometry, DodecahedronGeometry, Mesh, Points, ShaderMaterial, SphereGeometry, TetrahedronGeometry, TextureLoader } from "three";
import QuantaObject from "./objects/QuantaObject";
import Scope from "./types/Scope";
import { fibonacciSphere } from "./Geometries";

const rotationHeader = ``;

const translationHeader = ``;

const scaleHeader = ``;

function getRotationMatricies(rotation: string[]): string {
    return `
        // Rotation
        float cosRotX = cos(${rotation[0]});
        float sinRotX = sin(${rotation[0]});
        float cosRotY = cos(${rotation[1]});
        float sinRotY = sin(${rotation[1]});
        float cosRotZ = cos(${rotation[2]});
        float sinRotZ = sin(${rotation[2]});

        mat4 rXPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), 
                          vec4(0.0, cosRotX, -sinRotX, 0.0), 
                          vec4(0.0, sinRotX, cosRotX, 0.0), 
                          vec4(0.0, 0.0, 0.0, 1.0));

        mat4 rYPos = mat4(vec4(cosRotY, 0.0, sinRotY, 0.0), 
                          vec4(0.0, 1.0, 0.0, 0.0), 
                          vec4(-sinRotY, 0.0, cosRotY, 0.0), 
                          vec4(0.0, 0.0, 0.0, 1.0));

        mat4 rZPos = mat4(vec4(cosRotZ, -sinRotZ, 0.0, 0.0), 
                          vec4(sinRotZ, cosRotZ, 0.0, 0.0), 
                          vec4(0.0, 0.0, 1.0, 0.0), 
                          vec4(0.0, 0.0, 0.0, 1.0));

        vPosition =  rXPos * rZPos * rYPos;
    `
}

function getTranslationMatricies(translation: string[]): string {
    return `
        mat4 tPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), 
                         vec4(0.0, 1.0, 0.0, 0.0), 
                         vec4(0.0, 0.0, 1.0, 0.0), 
                         vec4(${translation[0]}, ${translation[1]}, ${translation[2]}, 1.0));
    `;
}

function getScaleMatricies(scale: string[]): string {
    return `
        // Scale
        mat4 sPos = mat4(vec4(${scale[0]}, 0.0, 0.0, 0.0), 
                         vec4(0.0, ${scale[1]}, 0.0, 0.0), 
                         vec4(0.0, 0.0, ${scale[2]}, 0.0), 
                         vec4(0.0, 0.0, 0.0, 1.0));
    `
}

export function buildFramentShader(uniformsStr: string, objectSpec: any): string {
    let colorVector = "1, 1, 1, 1";
    const hasTexture = objectSpec.hasOwnProperty("texture");

    if(objectSpec.hasOwnProperty("color")) {
        colorVector = objectSpec.color;
    }
    
    return `
        varying vec3 vUv;
        ${uniformsStr}
        
        void main() {
            vec3 position = vUv;
            gl_FragColor = vec4(${colorVector});
            ${hasTexture ? "gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );" : ""}
        }
    `
}

export function buildVertexShader(uniformsStr: string, objectSpec: any): string {
    let vPosition: string[] = [];
    let rotationMatricies = "";
    let translationMatricies = "";
    let scaleMatrix = "";
    let glPosition = "projectionMatrix * modelViewMatrix * vec4(position, 1.0)"

    // Transforms
    const hasRotation = objectSpec.hasOwnProperty("rotation");
    const hasTranslation = objectSpec.hasOwnProperty("translate");
    const hasScale = objectSpec.hasOwnProperty("scale");
    const hasTransformation = hasRotation || hasTranslation || hasScale;

    // Events
    let hasMouseOver = false;
    if(objectSpec.hasOwnProperty("events")) {
        hasMouseOver = objectSpec.events.hasOwnProperty("mouseOver");
    }

    if (hasTransformation) {
        glPosition = `projectionMatrix * modelViewMatrix * vPosition * vec4(position, 1.0)`;
    }

    if (hasRotation) {
        rotationMatricies = getRotationMatricies(objectSpec.rotation.split(','));
        vPosition = ["rXPos", "rYPos", "rZPos"]
    }

    if (hasTranslation) {
        translationMatricies = getTranslationMatricies(objectSpec.translate.split(','));
        vPosition.push("tPos")
    }

    if (hasScale) {
        scaleMatrix = getScaleMatricies(objectSpec.scale.split(','));
        vPosition.push("sPos")
    }

    return `
        varying vec3 vUv;
        varying float x;
        varying float y;
        varying float z;
        varying vec4 modelViewPosition;
        ${hasTransformation ? "varying mat4 vPosition;" : ""}
        ${hasRotation ? rotationHeader : ""}
        ${hasTranslation ? translationHeader : ""}
        ${hasScale ? scaleHeader : ""}
        ${uniformsStr}

        void main() {
            ${hasMouseOver ? `
                if(mouseOver){
                    ${objectSpec.events.mouseOver}
                }
            ` : ""}
            x = vUv.x;
            y = vUv.y;
            z = vUv.z;
            ${rotationMatricies}
            ${translationMatricies}
            ${scaleMatrix}
            ${hasTransformation ? `vPosition = ${vPosition.join("*")};` : ""}
            vUv = position;
            
            ${
                objectSpec.hasOwnProperty("pointSize") ?
                    `gl_PointSize = ${objectSpec.pointSize};` : ""
            }
            gl_Position = ${glPosition};
        }
    `
}

export function buildObject(objectSpec: any, scope: Scope): QuantaObject {
    let geometry: BufferGeometry;
    // console.log(objectSpec);

    // Events
    let eventVars: any = {}
    if(objectSpec.hasOwnProperty("events")) {
        if(objectSpec.events.hasOwnProperty("mouseOver")) {
            eventVars.mouseOver = {type: "bool", value: "false"}
        }
    }

    // Combine all vars in scope and make them available in the shaders
    let uniforms = Object.assign(scope.getAllVariables(), objectSpec.properties || {}, eventVars);
    if(objectSpec.hasOwnProperty("texture")) {
        uniforms.pointTexture = {value: new TextureLoader().load(objectSpec.texture), type: "sampler2D"}
    }

    // TODO: force lowercase
    // TODO: actually handle geometry args
    switch(objectSpec.geometry.type) {
        case "box":
            geometry = new BoxGeometry(objectSpec.geometry.args.scale);
            break;
        case "tetrahedron":
            geometry = new TetrahedronGeometry(objectSpec.geometry.args.scale);
            break;
        case "dodecahedron":
            geometry = new DodecahedronGeometry(objectSpec.geometry.args.scale);
            break;
        case "sphere":
            geometry = new SphereGeometry(
                objectSpec.geometry.args.scale,
                objectSpec.geometry.args.widthSegments,
                objectSpec.geometry.args.heightSegments
            );
            break;
        case "fibSphere":
            geometry = fibonacciSphere(
                objectSpec.geometry.args.scale,
                objectSpec.geometry.args.numPoints);
            break;
        default:
            throw new Error(`Unsupported geometry ${objectSpec.geometry.type}`)
    }


    let uniformsStr = Object.entries(uniforms).map((item: any) => {
        return `uniform ${item[1].type} ${item[0]};`
    }).join("\n");
    let vertexShader = buildVertexShader(uniformsStr, objectSpec);
    let fragmentShader = buildFramentShader(uniformsStr, objectSpec);

    let material = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    // Create mesh
    let mesh;
    let objType;
    switch(objectSpec.type) {
        case "mesh":
            mesh = new Mesh(geometry, material);
            objType = Mesh;
            break;
        case "points":
            mesh = new Points(geometry, material);
            objType = Points;
            break;
    }

    let result = new QuantaObject(mesh, geometry, material);
    result.setEventVariables(eventVars);

    return result;
}