const universeParams = {
    meta: {
        element: "/html/body"
    },
    globals: [
        {name: 'time'},
        {name: 'seed'}
    ],
    objects: [
        {
        name: 'test object',
        id: 'sdfsdf',
        mesh: {
            type: "instance",
            args: {"count": 10}
        },
        // texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/circle.png",
        properties: {
            f: {value: 0.25, type: "float"},
            overIncrease: {value: 0.75, type: "float"}
        },
        geometry: {
            type: 'sphere',
            args: {"scale": 0.25, numPoints: 10}
        },
        }
    ],
    fields: []
}

export interface IProgramArg {
    name: string,
    value: string
}

export interface IProgramMeta {
    element: string
}

export interface IProgramGlobal {
    name: string
}

export interface IProgramMesh {
    type: string,
    args: IProgramArg[]
}

export interface IProgramGeometry {
    type: string,
    args: IProgramArg[]
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

export interface ObjectSpec {
    name: string,
    id: string,
    mesh: IProgramMesh,
    geometry: IProgramGeometry,
    properties: IProgramArg[],
    color?: IProgramColor,
    rotation?: IProgramEuler,
    translation?: IProgramEuler,
    scale?: IProgramEuler,
    events?: IProgramEvent,
    pointSize?: string
}

export interface Program {
    meta: IProgramMeta,
    globals: IProgramGlobal[],
    objects: ObjectSpec[]
}