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
export function updateJSONValue(json: {} | undefined, name: string, value: string) {
  const _json = json || "undefined";
  if (_json === "undefined")
    throw new Error("provided value is undefined");

  return {
    ...json,
    [name]: value
  };
}

export function deepCopyJSON(json: any) {
  return JSON.parse(JSON.stringify(json));
}