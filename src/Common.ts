
export function buildShaderName(shaderType: string, objectId: string, eventName: string) {
    return `${objectId}.${eventName}.${shaderType}`;
  }