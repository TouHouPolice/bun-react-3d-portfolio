import * as THREE from 'three';

export function preprocessGLSLForThree(str: string): string {
    return str.replace(/^#version.*$/gm, '');
}

/** vec3.set(pointer.x, pointer.y, 0).unproject(camera) */
export function unprojectPointer(pointerPos: { x: number, y: number }, camera: THREE.Camera): THREE.Vector3 {
    // Convert to NDC
    const x = (pointerPos.x / window.innerWidth) * 2 - 1;
    const y = -(pointerPos.y / window.innerHeight) * 2 + 1;
    // Unproject
    return new THREE.Vector3(x, y, 0).unproject(camera);
}

export const addStyles = (css: string) => {
    const style = document.createElement('style')
    style.innerHTML = css
    document.body.appendChild(style)
}

const BASE_PATH = import.meta.env.BASE_URL;
console.log('Base Path:', BASE_PATH);
export const getAssetPath = (path: string) => {
    // Prevent double slashes
    if(path.startsWith('/')) path = path.slice(1);
    return BASE_PATH + path;
};