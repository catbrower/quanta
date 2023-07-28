import { IProgramColor, IProgramEuler } from "../ProgramInterfaces";

export function setColor(objName: string): string {
  return `${objName}.setColor()`
}

export function newColor(color: IProgramColor): string {
  return `new THREE.Color(${color.r}, ${color.g}, ${color.b}, ${color.a});`
}

export function newEuler(euler: IProgramEuler) {
  return `new THREE.Euler(${euler.x}, ${euler.y}, ${euler.z});`;
}