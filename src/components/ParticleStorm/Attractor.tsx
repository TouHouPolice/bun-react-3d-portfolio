import { useEffect, useRef, useContext } from "react";
import { DoubleSide, Vector3, Object3D } from "three";
import { Cone, Ring, TransformControls } from '@react-three/drei';
import { GlobalStateContext } from "@context/GlobalStateProvider";


interface AttractorProps {
    position?: Vector3,
    setPosition?: (position: Vector3) => void,
    rotationAxis?: Vector3,
    setRotationAxis?: (rotationAxis: Vector3) => void,
    enableTransformControls?: boolean,
    controlMode?: 'translate' | 'rotate',
}

export default function Attractor({
    position = new Vector3(0, 0, 0),
    setPosition = () => {},
    rotationAxis = new Vector3(0, 1, 0),
    setRotationAxis = () => {},
    enableTransformControls = true,
    controlMode = 'rotate',
}: AttractorProps) {
    const { setAllowOrbitControl } = useContext(GlobalStateContext);
    const attractorRef = useRef<Object3D>(null);
    // Initialize position and rotation of the group
    useEffect(() => {
        if (attractorRef.current) {
            attractorRef.current.position.copy(position);
            attractorRef.current.quaternion.setFromUnitVectors(
              new Vector3(0, 1, 0),
              rotationAxis
            );
        }
    },[])


    return (
    <>
        <object3D 
        ref={attractorRef}
        >
            {/* Helper Group */}
            <group scale={0.325}>
                {/* Ring Helper */}
                <Ring args={[1, 1.02, 32, 1, 0, Math.PI * 1.5]}>
                    <meshBasicMaterial side={DoubleSide} />
                </Ring>
                {/* Arrow Helper */}
                <Cone args={[0.1, 0.4, 12, 1, false]}>
                    <meshBasicMaterial side={DoubleSide} />
                </Cone>
            </group>
        </object3D>

         {/* Transform Controls */}
         <TransformControls
                mode={controlMode}
                size={0.5}
                position={position}
                enabled={enableTransformControls}
                visible={enableTransformControls}
                showX={enableTransformControls}
                showY={enableTransformControls}
                showZ={enableTransformControls}
                object={attractorRef.current || undefined}
                onMouseDown={(_) => setAllowOrbitControl(false)}
                onMouseUp={(_) => setAllowOrbitControl(true)}
                onObjectChange={(_) => {
                    if (attractorRef.current) {
                        setPosition(attractorRef.current.position);
                        setRotationAxis(new Vector3(0, 1, 0).applyQuaternion(attractorRef.current.quaternion));
                    }
                }}
            />
    </>
);
}