import { IUniform } from "three"

export type IProgramMeta = {
  element: string
}

export type IProgramUniforms = { [uniform: string]: { type: string, value: string } };

export interface IProgramMesh {
  type: number,
  args: IProgramUniforms
}

export interface IProgramGeometry {
  type: string,
  args: IProgramUniforms
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

export interface IProgramEvent {
  name: string,
  color?: IProgramColor,
  rotation?: IProgramEuler,
  translation?: IProgramEuler,
  scale?: IProgramEuler,
  pointSize?: string,
  texture?: string
}

export interface IProgramObject {
  name: string,
  id: string,
  mesh: IProgramMesh,
  geometry: IProgramGeometry,
  properties: IProgramUniforms,
  events: IProgramEvent[]
}

export interface IProgram {
  meta: IProgramMeta,
  globals: IProgramUniforms,
  objects: IProgramObject[]
}