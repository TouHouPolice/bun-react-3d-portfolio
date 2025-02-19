import Frame, { FrameType } from "@components/theme/Frame";
import { Col, Row } from "react-bootstrap";
import Header from "./Header";
import { Animator } from "@arwes/react";
import { theme } from "@styles/Arwes";
import Sidebar from "./Sidebar";

export default function Profile() {
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
                    <Sidebar/>
                </Col>
                <Col className="position-relative">
                    <Frame 
                    style={{width: '100%', height: '500px'}}
                    type={FrameType.OCTAGON}
                    />
                </Col>
            </Animator>
        </Row>
        </>
    )
}