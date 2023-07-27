import { IUniform } from "three"

export type IProgramMeta = {
  element: string
}

export type IProgramUniforms = { [uniform: string]: { type: string, value: string } };

export interface IProgramMesh {
  type: string,
  args: IProgramUniforms
}

export interface IProgramGeometry {
  type: string,
  args: IProgramUniforms
}

export interface IProgramMaterial {
  type: string,
  blending?: string,
  depthTest?: boolean,
  transparent?: boolean,
  vertexShaderKey?: string,
  fragmentShaderKey?: string
}

export interface IProgramColor {
  r: string,
  g: string,
  b: string,
  a: string
}

export interface IProgramEuler {
  x: string,
  y: string,
  z: string
}

export interface IProgramEventStep {
  id: string,
  type: string,
  content: any
}

// export interface IProgramEvent {
//   name: string,
//   color?: IProgramColor,
//   rotation?: IProgramEuler,
//   translation?: IProgramEuler,
//   scale?: IProgramEuler,
//   pointSize?: string,
//   texture?: string
// }

export interface IProgramEvent {
  name: string,
  steps: IProgramEventStep[]
}

export interface IProgramObject {
  name: string,
  id: string,
  mesh: IProgramMesh,
  geometry: IProgramGeometry,
  material: IProgramMaterial,
  properties: IProgramUniforms,
  events: IProgramEvent[]
}

export interface IProgram {
  meta: IProgramMeta,
  globals: IProgramUniforms,
  objects: IProgramObject[]
}