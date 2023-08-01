import {
  AdditiveBlending,
  BufferGeometry
} from "three";
import { buildShaderName, format, innerJSON } from "../../Common";
import { EVENTS, MATERIAL_TYPES, MESH_TYPE_DEFAULT, MESH_TYPE_INSTANCED, MESH_TYPE_POINTS } from "../../Constants";
import { IProgramGeometry, IProgramMaterial, IProgramMesh, IProgramObject } from "../ProgramInterfaces";
import { buildEvent } from "./EventBuilder";

function buildMesh(meshSpec: IProgramMesh): string {
  const meshType = meshSpec.type;

  switch (meshType) {
    case MESH_TYPE_DEFAULT:
      return `new THREE.Mesh(geometry, material)`;
    case MESH_TYPE_POINTS:
      return `new THREE.Points(geometry, material)`;
    case MESH_TYPE_INSTANCED:
      // let x = geometry.attributes.position
      // geometry = new InstancedBufferGeometry();
      // geometry.setAttribute("position", x);
      // geometry.setAttribute("testAttr", new InstancedBufferAttribute(new Float32Array[
      //     1.0, 1.0, 1.0
      // ]), 3);
      return `new THREE.InstancedMesh(geometry, material, 1000)`;
    // box(result, 10, 10, 10);
    // return result;
    default:
      throw new Error(`Unknown mesh type: ${meshType}`);
  }
}

function buildGeometry(geometrySpec: IProgramGeometry): string {
  let geometry: BufferGeometry;
  // TODO: force lowercase
  // TODO: actually handle geometry args
  let scale: number = parseFloat(geometrySpec.args.scale.value);
  let geometryType = geometrySpec.type;

  switch (geometryType) {
    case "box":
      return `new THREE.BoxGeometry(${scale}, ${scale}, ${scale})`;
    case "tetrahedron":
      return `new THREE.TetrahedronGeometry(${scale})`;
    case "dodecahedron":
      return `new THREE.DodecahedronGeometry(${scale})`;
    case "sphere":
      return `new THREE.SphereGeometry(
                ${scale},
                ${parseFloat(geometrySpec.args.widthSegments.value)},
                ${parseFloat(geometrySpec.args.heightSegments.value)}
            )`;
    case "fibSphere":
      return `fibonacciSphere(
                scale,
                parseFloat(geomertyArgs.numPoints.value))`;
    default:
      throw new Error(`Unsupported geometry ${geometryType}`)
  }
}

function buildMaterial(objectSpec: IProgramObject) {
  let result = '';
  switch (objectSpec.material.type) {
    case MATERIAL_TYPES.BASIC:
      result = 'new THREE.MeshBasicMaterial();'
      break;
    case MATERIAL_TYPES.SHADER:
      result = `new THREE.ShaderMaterial({
          uniforms: _uniforms,
          vertexShader: SHADERS["${buildShaderName('vertex', objectSpec.id, 'create')}"],
          fragmentShader: SHADERS["${buildShaderName('fragment', objectSpec.id, 'create')}"],
          ${objectSpec.material.blending ? `blending: ${objectSpec.material.blending},` : ''},
          ${objectSpec.material.depthTest ? `depthTest: ${objectSpec.material.depthTest},` : ''}
          ${objectSpec.material.transparent ? `transparent: ${objectSpec.material.transparent}` : ''}
        });`
      break;
  }


  return format(result);
}

export default function buildObject(objectSpec: IProgramObject): string {
  const eventCode = Object.fromEntries(Object.entries(objectSpec.events).map(([key, value]) => [key, buildEvent(value)]))

  let x: THREE.Mesh;
  let result = `
    (() => {
      var _uniforms = {${innerJSON(objectSpec.properties)}, ...uniforms};
      var material = ${buildMaterial(objectSpec)};
      var geometry = ${buildGeometry(objectSpec.geometry)};
      var mesh = ${buildMesh(objectSpec.mesh)};

      mesh.events = { ${Object.entries(eventCode).map(([k, v]) => { return `${k}: ${v}` }).reduce((acc, cur) => { return `${acc}, ${cur}` })} };
      ${EVENTS.CREATE in objectSpec.events ? `(${eventCode[EVENTS.CREATE]}).apply(mesh);` : ''}
      
      return mesh;
    })()`;

  return format(result);
}

// 
// 