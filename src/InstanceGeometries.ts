import { Color, ColorKeyframeTrack, InstancedMesh, Matrix4 } from "three";

export function box(mesh: InstancedMesh, x: number, y: number, z: number): Matrix4 {
    const matrix = new Matrix4;
    const amount = x * y * z;
    const offset = (x - 1) / 2;
    const color = new Color().setHex(0xffffff);
    let index = 0;
    for (let i = 0; i < x; i++) {
        for (let k = 0; k < y; k++) {
            for (let j = 0; j < z; j++) {
                matrix.setPosition(offset - i, offset - k, offset - j);
                // matrix.setPosition(i, 0, 0);
                mesh.setMatrixAt(index, matrix);
                mesh.setColorAt(index, color);
                index++;
            }
        }
    }

    return matrix;
}