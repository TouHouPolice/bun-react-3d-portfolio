import { useState } from "react";
import Welcome from "./main_overlay/Welcome";

export default function MainOverlay() {
    const [showWelcome, setShowWelcome] = useState(true)
    return (
        <div className="main-overlay">
            <Welcome show={showWelcome}/>
        </div>
    )
}