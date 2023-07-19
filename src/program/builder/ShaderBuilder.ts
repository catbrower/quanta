import { DEFAULT, INSTANCED, POINTS } from "../MeshTypes";
import { IProgramColor, IProgramEvent, IProgramUniforms } from "../Interfaces";

// String constants
const ROTATION_X: string = "rotation_x";
const ROTATION_Y: string = "rotation_y";
const ROTATION_Z: string = "rotation_z";    
const TRANSLATION_X: string = "translation_x";
const TRANSLATION_Y: string = "translation_y";    
const TRANSLATION_Z: string = "translation_z";
const SCALE_X: string = "scale_x";    
const SCALE_Y: string = "scale_y";
const SCALE_Z: string = "scale_z";
const ROTATION_MATRIX_X: string = "rotation_matrix_x";
const ROTATION_MATRIX_Y: string = "rotation_matrix_y";
const ROTATION_MATRIX_Z: string = "rotation_matrix_z";
const TRANSLATION_MATRIX: string = "translation_matrix";
const SCALE_MATRIX: string = "scale_matrix";

const rotationMatricies = `
// Rotation
float srx = cos(${ROTATION_X});
float crx = sin(${ROTATION_X});
float sry = cos(${ROTATION_Y});
float cry = sin(${ROTATION_Y});
float srz = cos(${ROTATION_Z});
float crz = sin(${ROTATION_Z});

mat4 ${ROTATION_MATRIX_X} = mat4(
    vec4(1.0, 0.0,  0.0, 0.0), 
    vec4(0.0, crx, -srx, 0.0), 
    vec4(0.0, srx,  crx, 0.0), 
    vec4(0.0, 0.0,  0.0, 1.0)
);

mat4 ${ROTATION_MATRIX_Y} = mat4(
    vec4( cry, 0.0, sry, 0.0), 
    vec4( 0.0, 1.0, 0.0, 0.0), 
    vec4(-sry, 0.0, cry, 0.0), 
    vec4( 0.0, 0.0, 0.0, 1.0)
);

mat4 ${ROTATION_MATRIX_Z} = mat4(
    vec4(crz, -srz, 0.0, 0.0), 
    vec4(srz,  crz, 0.0, 0.0), 
    vec4(0.0,  0.0, 1.0, 0.0), 
    vec4(0.0,  0.0, 0.0, 1.0)
);
`;

const translationMatricies = `
// Translation
mat4 ${TRANSLATION_MATRIX} = mat4(
    vec4(1.0, 0.0, 0.0, 0.0), 
    vec4(0.0, 1.0, 0.0, 0.0), 
    vec4(0.0, 0.0, 1.0, 0.0), 
    vec4(${TRANSLATION_X}, ${TRANSLATION_Y}, ${TRANSLATION_Z}, 1.0)
);
`;

const scaleMatricies = `
// Scale
mat4 ${SCALE_MATRIX} = mat4(
    vec4(${SCALE_X}, 0.0, 0.0, 0.0), 
    vec4(0.0, ${SCALE_Y}, 0.0, 0.0), 
    vec4(0.0, 0.0, ${SCALE_Z}, 0.0), 
    vec4(0.0, 0.0, 0.0, 1.0)
);
`;


const COMMON_SHADER_HEADER: string = `varying vec3 vUv;`;

const DEFAULT_COLOR: IProgramColor = {r: "0.5", g: "0.0", b: "1.0", a: "1.0"}

function buildUniforms(uniforms: IProgramUniforms): string {
    return Object.entries(uniforms).map((item: any) => {
        return `uniform ${item[1].type} ${item[0]};`
    }).join("\n");
}

export function buildFragmentShader(props: IProgramEvent, uniforms: IProgramUniforms): string {
    const color = props.color ? props.color : DEFAULT_COLOR;

    const uniformsString = buildUniforms(uniforms);

    let result =  `
        ${COMMON_SHADER_HEADER}
        ${uniformsString}
        
        varying vec3 vInstancePosition;
        void main() {
            vec3 position = vUv;
            float color_r = ${color.r};
            float color_g = ${color.g};
            float color_b = ${color.b};
            float color_a = ${color.a};

            gl_FragColor = vec4(color_r, color_g, color_b, color_a);
            
            // Textures disabled for now
            // {/*this.hasTexture ? "gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);" : ""*/}
    `;
    
    return result;
}

export function buildVertexShader(props: IProgramEvent, uniforms: IProgramUniforms, meshType: number): string {
    let uniformsString = buildUniforms(uniforms);
    const hasTransformation = props.rotation || props.translation || props.scale;

    // TODO instanceMatrixIsRequired, must use a flag to detect instancing
    // TODO apparently modelViewMatrix isn't set for instancing, instead use viewMatrix * modelMatrix
    let vPosition: string[] = ["projectionMatrix", "modelViewMatrix"];
    if(meshType === INSTANCED) vPosition.push( "instanceMatrix");
    if(props.rotation) vPosition.push(ROTATION_MATRIX_X, ROTATION_MATRIX_Y, ROTATION_MATRIX_Z);
    if(props.translation) vPosition.push(TRANSLATION_MATRIX);
    if(props.scale) vPosition.push(SCALE_MATRIX);

    vPosition.push("vec4(position, 1.0)");

    let result = `
        ${COMMON_SHADER_HEADER}
        varying vec4 modelViewPosition;
        // varying vec4 instancePosition;
        ${hasTransformation ? "varying mat4 vPosition;" : ""}
        ${uniformsString}

        varying vec3 vInstancePosition;
        void main() {
            vUv = position;
            // vec3 vInstancePosition = (instanceMatrix * vec4(position.x, position.y, position.z, 1.0)).xyz;
            
            ${props.rotation ? `
                float rotation_x = ${props.rotation.x};
                float rotation_y = ${props.rotation.y};
                float rotation_z = ${props.rotation.z};
            `: ""}

            ${props.translation ? `
                float translation_x = ${props.translation.x};
                float translation_y = ${props.translation.y};
                float translation_z = ${props.translation.z};
            `: ""}

            ${props.scale ? `
                float scale_x = ${props.scale.x};
                float scale_y = ${props.scale.y};
                float scale_z = ${props.scale.z};
            `: ""}

            ${props.rotation ? rotationMatricies : ""}
            ${props.translation ? translationMatricies : ""}
            ${props.scale ? scaleMatricies : ""}
            // vUv = position;
            
            ${ props.pointSize && meshType === POINTS ? `gl_PointSize = ${props.pointSize};` : "" }

            gl_Position = ${vPosition.join(" * ")};
        }
    `;

    return result;
}

export function buildShaders(shaderData: IProgramEvent, uniforms: IProgramUniforms, meshType: number = DEFAULT) {
    const result = {
        vertextShader: buildVertexShader(shaderData, uniforms, meshType),
        fragmentShader: buildFragmentShader(shaderData, uniforms)
    }

    return result;
}