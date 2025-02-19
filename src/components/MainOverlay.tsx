import Welcome from "./main_overlay/Welcome";
import { BleepsProvider } from "@arwes/react";
import { bleepsSettings } from "@styles/Arwes";
import { Routes, Route } from "react-router-dom";
import Profile from "./main_overlay/Profile";



export default function MainOverlay() {
    return (
        <BleepsProvider {...bleepsSettings}>
            <div className="main-overlay">
                <Routes>
                    <Route path="/" element={<Welcome/>} />
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
        </BleepsProvider>
    )
}