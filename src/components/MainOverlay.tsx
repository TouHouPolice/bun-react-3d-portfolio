import { useEffect, useState } from "react";
import Welcome from "./main_overlay/Welcome";
import { BleepsProvider } from "@arwes/react";
import { bleepsSettings } from "@styles/Arwes";




export default function MainOverlay() {
    const [showWelcome, setShowWelcome] = useState(true)
    const [hideWelcome, setHideWelcome] = useState(false)

    useEffect(() => {
        if (!showWelcome) {
            setTimeout(() => {
                setHideWelcome(true)
            }, 700)
        }
    }, [showWelcome])
    return (
        <BleepsProvider {...bleepsSettings}>
            <div className="main-overlay">
                <Welcome show={showWelcome} setShow={setShowWelcome} hide={hideWelcome}/>
            </div>
        </BleepsProvider>
    )
}