import { generateRandomFunctionName, indentLine } from "../../Common";
import { EVENT_STEPS, EVENT_STEP_TRANSFORMATIONS, MESH_TYPE_INSTANCED } from "../../Constants";
import { IProgramColor, IProgramEuler, IProgramEvent, IProgramEventStep, IProgramUniforms } from "../ProgramInterfaces";

// TODO these functions should return a string representation of a function that
// takes a mat4 as input, applies these transforms, and returns the result
// that way, I can take advantage of only applying the tring functions once
// without polluting scope. They can then all be chained together at the end
// to calculate the final vertex positions

// TODO for rotation, it can be optimized more by checking if any of the rotations are zero and excluding those
const rotationMatrixFunction = (rotX: string, rotY: string, rotZ: string): string[] => {
  const offset = 5;
  const funcName = generateRandomFunctionName();
  const lines = [
    `mat4 rotate_${funcName}(mat4 input) {`,
    indentLine(`mat4 x = mat4(vec4(1.0, 0.0,  0.0, 0.0),`, 1),
    indentLine(`vec4(0.0, crx, -srx, 0.0),`, offset),
    indentLine(`vec4(0.0, srx,  crx, 0.0),`, offset),
    indentLine(`vec4(0.0, 0.0,  0.0, 1.0));`, offset),
    "",
    indentLine(`mat4 y = mat4(vec4( cry, 0.0, sry, 0.0),`, 1),
    indentLine(`vec4( 0.0, 1.0, 0.0, 0.0),`, offset),
    indentLine(`vec4(-sry, 0.0, cry, 0.0),`, offset),
    indentLine(`vec4( 0.0, 0.0, 0.0, 1.0));`, offset),
    "",
    indentLine(`mat4 z = mat4(vec4(crz, -srz, 0.0, 0.0),`, 1),
    indentLine(`vec4(srz,  crz, 0.0, 0.0),`, offset),
    indentLine(`vec4(0.0,  0.0, 1.0, 0.0),`, offset),
    indentLine(`vec4(0.0,  0.0, 0.0, 1.0));`, offset),
    "",
    indentLine(`return input * x * y * z;`, 1),
    `}`
  ];

  return [lines.join('\n'), funcName];
}

const translationMatrixFunction = (transX: string, transY: string, transZ: string): string[] => {
  const funcName = generateRandomFunctionName();
  const offset = 4;
  const lines = [
    `mat4 trans_${funcName}(mat4 input) {`,
    indentLine(`mat4 rotation = mat4(`, 1),
    indentLine(`vec4(1.0, 0.0, 0.0, 0.0),`, offset),
    indentLine(`vec4(0.0, 1.0, 0.0, 0.0),`, offset),
    indentLine(`vec4(0.0, 0.0, 1.0, 0.0),`, offset),
    indentLine(`vec4(${transX}, ${transY}, ${transZ}, 1.0));`, offset),
    indentLine(`return input * rotation;`, 1),
    `}`
  ];

  return [lines.join('\n'), funcName];
}

const scaleMatrixFunction = (scaleX: string, scaleY: string, scaleZ: string): string[] => {
  const funcName = generateRandomFunctionName();
  const offset = 4;
  const lines = [
    `mat4 scale_${funcName}(mat4 input) {`,
    indentLine(`mat4 scale = mat4(`, 1),
    indentLine(`vec4(${scaleX}, 0.0, 0.0, 0.0),`, offset),
    indentLine(`vec4(0.0, ${scaleY}, 0.0, 0.0),`, offset),
    indentLine(`vec4(0.0, 0.0, ${scaleZ}, 0.0),`, offset),
    indentLine(`vec4(0.0, 0.0, 0.0, 1.0));`, offset),
    indentLine(`return input * scale;`, 1),
    `}`
  ]

  return [lines.join('\n'), funcName];
}

const eventStepToTransFunc = (step: IProgramEventStep) => {
  const content = step.content as IProgramEuler
  switch (step.type) {
    case EVENT_STEPS.SET_ROTATION:
      return rotationMatrixFunction(content.x, content.y, content.z);
    case EVENT_STEPS.SET_SCALE:
      return scaleMatrixFunction(content.x, content.y, content.z);
    case EVENT_STEPS.SET_TRANSLATE:
      return translationMatrixFunction(content.x, content.y, content.z);
    default:
      throw new Error("Provided EventStep is not a type of transformation");
  }
}

const COMMON_SHADER_HEADER: string = `varying vec3 vUv;`;

const DEFAULT_COLOR: IProgramColor = { r: "0.5", g: "0.0", b: "1.0", a: "1.0" }

function buildUniforms(uniforms: IProgramUniforms): string {
  return Object.entries(uniforms).map((item: any) => {
    return `uniform ${item[1].type} ${item[0]};`
  }).join("\n");
}

export function buildFragmentShader(props: IProgramEvent, uniforms: IProgramUniforms): string {
  // const color = props.color ? props.color : DEFAULT_COLOR;
  const color = DEFAULT_COLOR;

  const uniformsString = buildUniforms(uniforms);

  let result = `
        ${COMMON_SHADER_HEADER}
        ${uniformsString}
        
        void main() {
            vec3 position = vUv;
            float color_r = ${color.r};
            float color_g = ${color.g};
            float color_b = ${color.b};
            float color_a = ${color.a};

            gl_FragColor = vec4(color_r, color_g, color_b, color_a);
            
            // Textures disabled for now
            // {this.hasTexture ? "gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);" : ""}
        }`;

  return result;
}

export function buildVertexShader(props: IProgramEvent, uniforms: IProgramUniforms, meshType: string): string {
  let uniformsString = buildUniforms(uniforms);
  const steps = props.steps;
  const hasTransformation = steps.map((step) => step.type in EVENT_STEP_TRANSFORMATIONS).reduce((acc, cur) => acc || cur);
  const transformationFuncs = steps.filter((step) => step.type in EVENT_STEP_TRANSFORMATIONS).map((step) => eventStepToTransFunc(step));

  // TODO instanceMatrixIsRequired, must use a flag to detect instancing
  // TODO apparently modelViewMatrix isn't set for instancing, instead use viewMatrix * modelMatrix
  let vPosition: string[] = ["projectionMatrix", "modelViewMatrix"];
  if (meshType === MESH_TYPE_INSTANCED) vPosition.push("instanceMatrix");
  vPosition.push("vec4(position, 1.0)");

  let result = `
        ${COMMON_SHADER_HEADER}
        varying vec4 modelViewPosition;
        ${hasTransformation ? "varying mat4 vPosition;" : ""}
        ${uniformsString}

        void main() {
            vUv = position;
            gl_Position = ${vPosition.join(" * ")};    
        }
    `;

  // Point size is removed for now
  // ${ props.pointSize && meshType === MESH_TYPE_POINTS ? `gl_PointSize = ${props.pointSize};` : "" }
  return result;
}

export function buildShaders(shaderData: IProgramEvent, uniforms: IProgramUniforms, meshType: string) {
  const result = {
    vertextShader: buildVertexShader(shaderData, uniforms, meshType),
    fragmentShader: buildFragmentShader(shaderData, uniforms)
  }

  return result;
}