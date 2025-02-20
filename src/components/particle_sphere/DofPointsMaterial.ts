import * as THREE from 'three'
import { MaterialNode } from '@react-three/fiber'
import DofPointsVert from '@shaders/dof_points.vert.glsl';
import DofPointsFrag from '@shaders/dof_points.frag.glsl';
import { preprocessGLSLForThree } from '@utils/utils';

const pointsVert: string = preprocessGLSLForThree(DofPointsVert);
const pointsFrag: string = preprocessGLSLForThree(DofPointsFrag);

export default class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: pointsVert,
      fragmentShader: pointsFrag,
      uniforms: {
        positions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 },
        uOpacity: { value: 1 },
        uColor: { value: new THREE.Vector4(1,1,1,1) }
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    })
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    dofPointsMaterial: MaterialNode<DofPointsMaterial, typeof DofPointsMaterial>
  }
}



