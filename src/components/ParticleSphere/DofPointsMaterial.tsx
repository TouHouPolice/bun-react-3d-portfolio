import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import DofPointsVert from '@shaders/dof_points.vert.glsl';
import DofPointsFrag from '@shaders/dof_points.frag.glsl';
import { PreprocessGLSLForThree } from '@utils/utils';

const pointsVert: string = PreprocessGLSLForThree(DofPointsVert);
const pointsFrag: string = PreprocessGLSLForThree(DofPointsFrag);

class DofPointsMaterial extends THREE.ShaderMaterial {
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
        uOpacity: { value: 1 }
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false
    })
  }
}

extend({ DofPointsMaterial })