import { 
    Color, 
} from 'three';

export interface ParticleParams {
    count: number;
    timeScale: number;
    spinningStrength: number;
    maxSpeed: number;
    gravityConstant: number;
    velocityDamping: number;
    scale: number;
    boundHalfExtent: number;
    colorA: Color;
    colorB: Color;
}

export const kDefaultParticleParams: ParticleParams = {
    count: Math.pow( 2, 18 ),
    timeScale: 1,
    spinningStrength: 2.75,
    maxSpeed: 8,
    gravityConstant: 6.67e-11,
    velocityDamping: 0.1,
    scale: 0.008,
    boundHalfExtent: 8,
    colorA: new Color('#5900ff'),
    colorB: new Color('#ffa575'),
};
