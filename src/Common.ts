import { INDENT } from "./Constants";
import { IProgramColor, IProgramEuler } from "./program/ProgramInterfaces";

export const OBJECT_JSON_PATH_SEPERATOR = ".";

export function buildShaderName(shaderType: string, objectId: string, eventName: string) {
  return `${objectId}.${eventName}.${shaderType}`;
}

// return a json obj as a string without enclosing bracets
// used a few times in the compiler to manually combine json objects
export function innerJSON(json: any): string {
  let result = JSON.stringify(json);
  result = result.slice(1, result.length - 1);

  return result;
}

export function simpleJSONReducer(state: any, event: any) {
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}

// Typescript doesn't like that many of the json objects can potentially be undefined
// utility function to handle the eslint error so I don't have to do it a bunch of times
export function updateJSONValue(json: {} | undefined, name: string, value: any) {
  const _json = json || "undefined";
  if (_json === "undefined")
    throw new Error("provided value is undefined");

  return {
    ...json,
    [name]: value
  };
}

// Get a json property by string
// this function handles typescripts annoying inability to access it directly b/c undefined
export function getJSONProperty(json: any, property: string) {
  const entries = Object.entries(json);
  for (const item of entries) {
    if (item[0] === property) {
      return item[1];
    }
  }
  return null;
}

export function deepCopyJSON(json: any) {
  return JSON.parse(JSON.stringify(json));
}

export function lastItem(collection: any[]) {
  return collection[collection.length - 1];
}

export function capitalize(value: string): string {
  return `${value[0].toLocaleUpperCase()}${value.slice(1)}`;
}

export function uniformColor(value: string): IProgramColor {
  return { r: value, g: value, b: value, a: value };
}

export function uniformEuler(value: string): IProgramEuler {
  return { x: value, y: value, z: value };
}

export function indentLine(line: string, amount: number) {
  return `${INDENT.repeat(amount)}${line}`;
}

export function indentMultiLine(lines: string, amount: number) {
  return lines.split('\n').map((line) => indentLine(line, amount)).join('\n');
}

export function generateRandomFunctionName(length: number = 16, allowNums: boolean = true): string {
  const startChars = 'abcdefghijklmnopqrstuvwxyz';
  const allChars = `${startChars}0123456789`;
  let result = '';
  for (let i = 0; i < length; i++) {
    let index = 0;
    if (i === 0 || !allowNums) {
      index = Math.floor(Math.random() * startChars.length);
    } else {
      index = Math.floor(Math.random() * allChars.length);
    }
    result += allChars[index];
  }
  return result;
}