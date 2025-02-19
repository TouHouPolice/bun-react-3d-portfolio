import Frame, { FrameType } from "@components/theme/Frame";
import { Col, Row } from "react-bootstrap";
import { Animated, Animator, Text } from "@arwes/react";
import { theme } from "@styles/Arwes";
import { useEffect, useState } from "react";

export default function Header(){
    const [iconComponents, setIconComponents] = useState();

    useEffect(() => {
        fetch('/resources/header_icons.json')
            .then(response => response.json())
            .then(data => {
                const components = data.map((icon: { font_awesome: string, url: string }, index: number) => {
                    return (
                        <a 
                        target="_blank" 
                        key={`icon-${index}`}
                        href={icon.url}
                        >
                            <Animated
                                as='i'
                                className={`fa-3x fab ${icon.font_awesome}`}
                                style={{marginRight: theme.space(4)}}
                                animated={['flicker', ['rotate', -45, 0]]}
                            />
                        </a>
                    );
                });
                setIconComponents(components)
            }
            )
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    return (
    <Animator>
        <Row 
        className="position-relative align-items-center"
        style={{ 
            padding: '10px 0',
        }}
        >
            <Col
            className="d-flex align-items-center"
            style={{marginLeft: theme.space(3)}}
            >
                <Animator duration={{ enter: 0.8 }}>
                    <Animated
                        as='img'
                        className='logo-image'
                        animated={['flicker', ['rotate', -45, 0]]}
                        src="assets/images/logoicon.svg"
                    />
                </Animator>
                <Text
                as="h2"
                style={{
                    textTransform: 'uppercase',
                    marginLeft: theme.space(3),
                    color: theme.color.primary(3),
                    textShadow: `0 0 2px ${theme.color.primary(3)}`
                }}
                >
                    Classfied
                </Text>
            </Col>
            <Col 
            className="d-flex justify-content-end"
            style={{marginRight: theme.space(3)}}
            >
                {iconComponents}
            </Col>
            <Frame
                type={FrameType.OCTAGON}
                style={{ position: 'absolute', width: '100%', height:'100%'}}
            />
        </Row>
    </Animator>
    )
}