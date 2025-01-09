import { Canvas } from "@react-three/fiber";
import React, { ReactNode } from "react";

// A wrapper for the Canvas component from @react-three/fiber
export default function ThreeCanvas(
    { children }: { children: ReactNode },
) {
    
    return (
    <Canvas
        fallback={<div>Sorry no WebGL supported!</div>}
    >
        {children}
    </Canvas>)
}