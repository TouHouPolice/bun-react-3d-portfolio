import Frame, { FrameType } from "@components/theme/Frame";
import { Col, Row } from "react-bootstrap";
import { Animated, Animator } from "@arwes/react";
import { theme } from "@styles/Arwes";
import { useEffect, useState } from "react";
import Text from "@components/theme/Text";
import { addStyles, getAssetPath } from "@utils/utils";

export default function Header(){
    const [iconComponents, setIconComponents] = useState();

    useEffect(() => {
        fetch(getAssetPath('/resources/header_icons.json'))
            .then(response => response.json())
            .then(data => {
                const components = data.map((icon: { font_awesome: string, url: string }, index: number) => {
                    return (
                        <a 
                        target="_blank" 
                        key={`icon-${index}`}
                        href={icon.url}
                        style={{pointerEvents: 'auto'}}
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
        <Frame
        type={FrameType.OCTAGON}
        >
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
                as="span"
                style={{
                    fontSize: `${theme.font(0).fontSize}`,
                    textTransform: 'uppercase',
                    marginLeft: theme.space(3),
                    color: theme.color.primary(3),
                    textShadow: `0 0 2px ${theme.color.primary(3)}`
                }}
                >
                    ///Acess Granted///
                </Text>
            </Col>
            <Col 
            className="d-flex justify-content-end"
            style={{marginRight: theme.space(3)}}
            >
                {iconComponents}
            </Col>

        </Row>
        </Frame>
    </Animator>
    )
}

addStyles(`
.logo-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* Prevent blocking the image */
  background-color: ${theme.color.primary(3)};
}
`)