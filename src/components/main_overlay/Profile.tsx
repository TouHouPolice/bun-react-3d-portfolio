import Frame, { FrameType } from "@components/theme/Frame";
import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import { Animator } from "@arwes/react";
import { theme } from "@styles/Arwes";
import Sidebar from "./Profile/Sidebar";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Project from "./Profile/Project";
import { getAssetPath } from "@utils/utils";

export default function Profile() {
    const [profileData, setProfileData] = useState();
    useEffect(() => {
        fetch(getAssetPath('/resources/profile_data.json'))
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
                className="left-panel"
                xl={3} md={4} sm={5}
                >
                    <Sidebar profileData={profileData}/>
                </Col>
                <Col 
                className="right-panel"
                style={{width: '100%', position: 'relative'}}
                >
                <Frame type={FrameType.OCTAGON}>
                    <Routes>
                        {profileData && 
                        <Route 
                        path="/projects/:index" 
                        element={<Project projectsData={profileData["projects"]}/>} 
                        />
                        }
                    </Routes>
                </Frame>

                </Col>
            </Animator>
        </Row>
        </>
    )
}