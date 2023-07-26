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

// export const EVENT_PROPERTY_COLOR = "color";
// export const EVENT_PROPERTY_TRANSLATE = "translation";
// export const EVENT_PROPERTY_SCALE = "scale";
// export const EVENT_PROPERTY_ROTATE = "rotation";
// export const EVENT_PROPERTY_POINT_SIZE = "pointSize";
// export const EVENT_PROPERTY_ALL = [
//   EVENT_PROPERTY_COLOR,
//   EVENT_PROPERTY_TRANSLATE,
//   EVENT_PROPERTY_SCALE,
//   EVENT_PROPERTY_ROTATE,
//   EVENT_PROPERTY_POINT_SIZE
// ];

export const EVENT_STEP_COLOR = "color";
export const EVENT_STEP_TRANSLATE = "translate";
export const EVENT_STEP_SCALE = "scale";
export const EVENT_STEP_ROTATE = "rotate";
export const EVENT_STEP_POINT_SIZE = "point_size";
export const EVENT_STEP_SET_SHADER = "set_shader";
export const EVENT_STEP_TRANSFORMATIONS = [
  EVENT_STEP_TRANSLATE,
  EVENT_STEP_SCALE,
  EVENT_STEP_ROTATE
]
export const EVENT_STEP_ALL = [
  EVENT_STEP_COLOR,
  EVENT_STEP_TRANSLATE,
  EVENT_STEP_SCALE,
  EVENT_STEP_ROTATE,
  EVENT_STEP_POINT_SIZE,
  EVENT_STEP_SET_SHADER
]