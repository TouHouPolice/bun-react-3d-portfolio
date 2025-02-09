import { Effects } from "@react-three/drei"
import { extend, Object3DNode, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import { useRef } from "react"
import { Vector2 } from "three"
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader } from 'three-stdlib'
extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass })

declare module '@react-three/fiber' {
  interface ThreeElements {
    waterPass: Object3DNode<WaterPass, typeof WaterPass>,
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>,
    filmPass: Object3DNode<FilmPass, typeof FilmPass>,
    lUTPass: Object3DNode<LUTPass, typeof LUTPass>,
  }
}



export default function PostProc() {
    const water = useRef<WaterPass>(null!)
    const data = useLoader(LUTCubeLoader, '/cubicle.CUBE')
    // Get canvas width and height, useThree
    const { size } = useThree()


    const props = useControls({
        waterFactor: { value: 0.39, min: 0, max: 1, step: 0.01 },
        bloomStrength: { value: 0.80, min: 0, max: 2, step: 0.01 },
        bloomRadius: { value: 0.20, min: 0, max: 2, step: 0.01 },
        bloomThreshold: { value: 0.001, min: 0, max: 1, step: 0.001 },
        filmNoiseIntensity: { value: 0.2, min: 0, max: 1, step: 0.01 },
        filmScanlinesIntensity: { value: 0.30, min: 0, max: 1, step: 0.01 },
        filmScanlinesCount: { value: 1500, min: 0, max: 3000, step: 1 },
        lutIntensity: { value: 0.3, min: 0, max: 1, step: 0.01 },
    })

    useFrame((state) => {
        if (!water.current) return
        water.current.time = state.clock.elapsedTime * 4
    })
    return (
      <Effects disableGamma>
        <waterPass ref={water} factor={props.waterFactor} />
        <unrealBloomPass
            resolution={new Vector2(size.width, size.height)}
            strength={props.bloomStrength}
            radius={props.bloomRadius}
            threshold={props.bloomThreshold}
        />
        <filmPass 
            args={[
                props.filmNoiseIntensity,
                props.filmScanlinesIntensity,
                props.filmScanlinesCount,
                false]} />
        <lUTPass lut={data.texture} intensity={props.lutIntensity} />
      </Effects>
    )
  }