import { GlobalStateContext } from "@context/GlobalStateProvider";
import { Stats } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { ReactNode, useContext } from "react";

// A wrapper for the Canvas component from @react-three/fiber
export default function ThreeCanvas(
    { children, showState }: { children: ReactNode, showState?: boolean },
) {
    const { setPointerCanvasPos: setMouseCanvasPos } = useContext(GlobalStateContext)
    const handlePointerMove = (event: any) => {
        const e = event as ThreeEvent<PointerEvent>
        setMouseCanvasPos({ x: e.clientX, y: e.clientY })
    }

    return (
    <Canvas
        onPointerMove={handlePointerMove}
        fallback={<div>Sorry no WebGL supported!</div>}
    >
        <>
            {children}
            {showState && <Stats />}
        </>
        
    </Canvas>)
}
