import * as THREE from 'three';

export default class QuantaObject {
    private mesh: THREE.Mesh;
    private geometry: THREE.BufferGeometry;
    private material: THREE.MeshBasicMaterial;

    constructor(geometry: THREE.BufferGeometry, material: THREE.MeshBasicMaterial) {
        this.geometry = geometry;
        this.material = material;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    update(state: any) {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

    getMesh() {
        return this.mesh;
    }
}