import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";

// A wrapper for the Canvas component from @react-three/fiber
export default function ThreeCanvas(
    { children, showState }: { children: ReactNode, showState?: boolean },
) {
    
    return (
    <Canvas
        fallback={<div>Sorry no WebGL supported!</div>}
    >
        <>
            {children}
            {showState && <Stats />}
        </>
        
    </Canvas>)
}