import {
  AdditiveBlending,
  BufferGeometry
} from "three";
import { buildShaderName, innerJSON } from "../../Common";
import { MESH_TYPE_DEFAULT, MESH_TYPE_INSTANCED, MESH_TYPE_POINTS } from "../../Constants";
import { IProgramGeometry, IProgramMesh, IProgramObject } from "../ProgramInterfaces";

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

export default function buildObject(objectSpec: IProgramObject): string {
  const blending = AdditiveBlending;
  const depthTest = false;
  const transparent = true;

  return `
    (() => {
      var _uniforms = {${innerJSON(objectSpec.properties)}, ...uniforms};

      var material = new THREE.ShaderMaterial({
        uniforms: _uniforms,
        vertexShader: SHADERS["${buildShaderName('vertex', objectSpec.id, 'create')}"],
        fragmentShader: SHADERS["${buildShaderName('fragment', objectSpec.id, 'create')}"],
        blending: ${blending},
        depthTest: ${depthTest},
        transparent: ${transparent}
      });

      var geometry = ${buildGeometry(objectSpec.geometry)};

      return ${buildMesh(objectSpec.mesh)};
    })()`;
}