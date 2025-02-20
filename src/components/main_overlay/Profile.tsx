import Frame, { FrameType } from "@components/theme/Frame";
import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import { Animator } from "@arwes/react";
import { theme } from "@styles/Arwes";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Project from "./Project";

export default function Profile() {
    const [profileData, setProfileData] = useState();
    useEffect(() => {
        fetch('/resources/profile_data.json')
            .then(response => response.json())
            .then(data => {
                setProfileData(data)
            }
            )
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
        <>
        <Header/>
        <Row style={{marginTop: theme.space(4)}}>
            <Animator>
                <Col 
                className="position-relative" 
                xl={2} md={3} sm={4}
                style={{marginRight: theme.space(4)}}
                >
                    <Sidebar profileData={profileData}/>
                </Col>
                <Col className="position-relative">
                    <Frame 
                    style={{width: '100%', minHeight: '50px'}}
                    type={FrameType.OCTAGON}
                    />
                    <Routes >
                        {profileData && 
                        <Route 
                        path="/projects/:index" 
                        element={<Project projectsData={profileData["projects"]}/>} 
                        />
                        }
                        
                    </Routes>
                </Col>
            </Animator>
        </Row>
        </>
    )
}