import { BufferGeometry, Float32BufferAttribute } from "three";

export function fibonacciSphere(scale: number, numSamples: number): THREE.BufferGeometry {
  let positions = []
  let result = new BufferGeometry();
  let phi = Math.PI * (Math.sqrt(5.0) - 1.0)

  for (let i = 0; i < numSamples; i++) {
    let y = 1 - (i / (numSamples - 1)) * 2;
    let radius = Math.sqrt(1 - y * y);
    let theta = phi * i;
    let x = Math.cos(theta) * radius;
    let z = Math.sin(theta) * radius;

    positions.push(x * scale, y * scale, z * scale);
  }

  result.setAttribute("position", new Float32BufferAttribute(positions, 3));
  result.computeVertexNormals();
  return result;
}