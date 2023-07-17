import { IUniform } from "three"

export type IProgramMeta = {
    element: string
}

export type IProgramUniform = { type: string, value: string }

export type IProgramUniforms = { [uniform: string]: IProgramUniform };

export interface IProgramGlobal {
    name: string
}

export interface IProgramMesh {
    type: string,
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
    color?: IProgramColor,
    rotation?: IProgramEuler,
    translation?: IProgramEuler,
    scale?: IProgramEuler
}

export interface IProgramObject {
    name: string,
    id: string,
    mesh: IProgramMesh,
    geometry: IProgramGeometry,
    properties: IProgramUniforms,
    color?: IProgramColor,
    rotation?: IProgramEuler,
    translation?: IProgramEuler,
    scale?: IProgramEuler,
    events?: IProgramEvent,
    pointSize?: string
}

export interface IProgram {
    meta: IProgramMeta,
    globals: IProgramGlobal[],
    objects: IProgramObject[]
}