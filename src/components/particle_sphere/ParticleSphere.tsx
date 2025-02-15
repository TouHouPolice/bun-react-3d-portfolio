import { useControls } from "leva";
import Particles from "./Particles";
import { useContext, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GlobalStateContext } from "@context/GlobalStateProvider";

const ANIMATION_DURATION = 0.2;
const RESTORE_DURATION = 3;
const CLICK_EXPEL_STRENGTH = -0.2;
const CLICK_CURL = 0;
const CLICK_APERTURE = 3.5;

export default function ParticleSphere() {
    const levaProps = useControls({
        color: { value: "#7caecc" },
        focus: { value: 4.64, min: 0, max: 7, step: 0.01 },
        speed: { value: 17.5, min: 0.1, max: 100, step: 0.1 },
        aperture: { value: 5.0, min: 1, max: 5.6, step: 0.1 },
        fov: { value: 78, min: 0, max: 200 },
        curl: { value: 0.55, min: 0.01, max: 2, step: 0.01 },
        opacity: { value: 1, min: 0, max: 1, step: 0.01 },
        expelStrength: { value: 0.54, min: 0, max: 5, step: 0.01 },
    });

    // Use state to ensure reactivity
    const [props, setProps] = useState(levaProps);
    const animationProgress = useRef(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);

    const { setMousePos } = useContext(GlobalStateContext)
    const handlePointerMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }
  
    useEffect(() => {
      window.addEventListener('mousemove', handlePointerMove)

        return () => {
            window.removeEventListener('mousemove', handlePointerMove)
        }
    }, [])

    useEffect(() => {
        setProps(levaProps); // Sync initial values with Leva
    }, [levaProps]);

    useEffect(() => {
        const handleClick = () => {
            animationProgress.current = 0;
            setIsAnimating(true);
            setIsRestoring(false);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    useFrame((_, delta) => {
        if (isAnimating) {
            const newProgress = Math.min(animationProgress.current + delta / ANIMATION_DURATION, 1);
            setProps((prev) => ({
                ...prev,
                curl: prev.curl + (CLICK_CURL - prev.curl) * newProgress,
                expelStrength: prev.expelStrength + (CLICK_EXPEL_STRENGTH - prev.expelStrength) * newProgress,
                aperture: prev.aperture + (CLICK_APERTURE - prev.aperture) * newProgress,
            }));
            animationProgress.current = newProgress;

            if (animationProgress.current >= 1) {
                animationProgress.current = 0;
                setIsAnimating(false);
                setIsRestoring(true);
            }
        } else if (isRestoring) {
            const newProgress = Math.min(animationProgress.current + delta / RESTORE_DURATION, 1);
            setProps((prev) => ({
                ...prev,
                curl: CLICK_CURL + (levaProps.curl - CLICK_CURL) * newProgress,
                expelStrength: CLICK_EXPEL_STRENGTH + (levaProps.expelStrength - CLICK_EXPEL_STRENGTH) * newProgress,
                aperture: CLICK_APERTURE + (levaProps.aperture - CLICK_APERTURE) * newProgress,
            }));
            animationProgress.current = newProgress;

            if (animationProgress.current >= 1) {
                animationProgress.current = 0;
                setIsRestoring(false);
            }
        }
    });

    return (
        <>
            <Particles {...props} />
        </>
    )
}