
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