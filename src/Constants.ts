import { IProgramColor, IProgramEuler } from "./program/ProgramInterfaces";

export const INDENT_4: string = '    ';
export const INDENT_2: string = '  ';
export const INDENT: string = INDENT_2;

export const MESH_TYPE_DEFAULT = "mesh";
export const MESH_TYPE_POINTS = "points";
export const MESH_TYPE_INSTANCED = "instanced";
export const MESH_TYPE_ALL = [
  MESH_TYPE_DEFAULT,
  MESH_TYPE_POINTS,
  MESH_TYPE_INSTANCED
];

export const EVENT_STEPS = {
  SET_COLOR: "color",
  SET_TRANSLATE: "translate",
  SET_SCALE: "scale",
  SET_ROTATION: "rotate",
  SET_POINT_SIZE: "point_size",
  SET_SHADER: "set_shader"
}

export const EVENT_STEP_TRANSFORMATIONS = [
  EVENT_STEPS.SET_TRANSLATE,
  EVENT_STEPS.SET_SCALE,
  EVENT_STEPS.SET_ROTATION
]
export const EVENT_STEP_ALL = [
  EVENT_STEPS.SET_COLOR,
  EVENT_STEPS.SET_TRANSLATE,
  EVENT_STEPS.SET_SCALE,
  EVENT_STEPS.SET_ROTATION,
  EVENT_STEPS.SET_POINT_SIZE,
  EVENT_STEPS.SET_SHADER
]

export const MATERIAL_TYPES = {
  BASIC: "basic",
  SHADER: "shader"
}