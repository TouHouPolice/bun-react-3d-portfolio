import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Text from "@components/theme/Text";
import { Col, Row } from "react-bootstrap";
import { theme } from "@styles/Arwes";
import { Animated } from "@arwes/react";
import Frame, { FrameType } from "@components/theme/Frame";
import SciFiCarousel from "./ScifiCarousel";
import { getAssetPath } from "@utils/utils";

type ProjectData = {
    description: string;
    demo_url: string | null;
    resource_directory: string | null;
    link: string | null;
    label: string;
    screenshots: string[];
};

type ProjectProps = {
    projectsData?: Array<ProjectData>,
}

const RESOURCE_DIR_ROOT = getAssetPath("/resources/projects/");


export default function Project( {projectsData}: ProjectProps ) {
    const { index } = useParams();
    const [label, setLabel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [demoUrl, setDemoUrl] = useState<string | null>();
    const [screenShots, setScreenShots] = useState<string[] | null>();
    const [link, setLink] = useState<string | null>("");

    useEffect(() => {
        if(projectsData && index !== undefined){
            const data: ProjectData = projectsData[parseInt(index)];
            setLabel(data.label);
            setDescription(data.description);
            setDemoUrl(data.demo_url);
            setLink(data.link);
            // join the resource directory with the root directory gracefully
            const screenshotsFullPath = data.screenshots.map(
                (filename) => RESOURCE_DIR_ROOT + data.resource_directory + "/" + filename
            );
            setScreenShots(screenshotsFullPath);
        }

    }, [projectsData, index]);
    if (!label)
        return (
        <div className="w-100">
            <Row>
                <Col>
                    <Text as="h1">No project found</Text>
                </Col>
            </Row>
        </div>);

    return (
        <div className="w-100">
            <Row>
                <Col>
                    <div 
                    style={{
                        position: 'relative',
                        width: '100%',
                        marginTop: theme.space(5),
                        display: 'flex',
                        justifyContent: 'center',
                        paddingBottom: theme.space(2),
                        borderBottom: `1px solid ${theme.color.primary(3)}`,
                        boxShadow: `0 10px 15px ${theme.color.primary(6, {alpha:0.5})}`,
                    }}>
                    <Text 
                    as="h1"
                    >
                        {label}
                    </Text>
                    </div>
                    {link && (
                        <a 
                        target="_blank" 
                        href={link}
                        style={{
                            pointerEvents: 'auto',
                            position:"absolute",
                            right: theme.space(6),
                            top: theme.space(5),
                        }}
                        >
                            <Animated
                                as='i'
                                className={`fa-2x fas fa-external-link-alt`}
                                style={{marginRight: theme.space(4)}}
                                animated={['flicker', ['rotate', -45, 0]]}
                            />
                        </a>
                    )}
                </Col>
            </Row>
            <Row>
                <Col sm={{offset:1, span:10}} md={{offset: 2, span: 8}}>
                    <Row>
                        <Text 
                        as="p" 
                        className="project-description"
                        style={{
                            marginTop: theme.space(4),
                            // evenly space the text
                            textAlign: 'justify',
                        }}
                        >
                            {description}
                        </Text>
                    </Row>

                    {demoUrl && (
                    <Row>
                        <Frame
                        className="demo-frame"
                        type={FrameType.NERO}
                        style={{
                            position: 'relative',
                            width: '100%',
                            marginTop: theme.space(4),
                            marginBottom: theme.space(6),
                            padding: "5px",
                        }}
                        >
                        <div style={{ 
                            position: "relative", 
                            width: "100%", 
                            paddingTop: "56.25%", 
                            pointerEvents:"auto",
                            borderRadius: "15px",
                            border: `1px solid ${theme.color.primary(6)}`,
                            }}>
                            <iframe
                                src={demoUrl}
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                allowFullScreen
                            />
                        </div>
                        </Frame>
                    </Row>
                    )}

                    {screenShots && screenShots.length > 0 && (
                    <Row>
                        <Frame
                        className="carousel-frame"
                        style={{padding: "5px", marginBottom: theme.space(6)}}
                        type={FrameType.NERO}>
                        <SciFiCarousel
                        styles={{
                            width: "100%",
                            position: 'relative', 
                            borderRadius: "15px",
                            border: `1px solid ${theme.color.primary(6)}`,
                        }}
                        images={screenShots}/>
                        </Frame>
                    </Row>
                    )}

                </Col>
            </Row>
        </div>);

}