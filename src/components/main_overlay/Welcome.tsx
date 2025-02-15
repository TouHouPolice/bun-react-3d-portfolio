import {Animator, FrameCircle, Text } from "@arwes/react";
import { Container } from "react-bootstrap";
import {theme} from '@styles/Arwes'
import ThemeButton from "@components/theme/Button";

interface WelcomeProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    hide: boolean;
}

export default function Welcome({ show, setShow, hide }: WelcomeProps) {

    if (hide) return <></>

    return (
        <Container fluid className="welcome-container h-100">
            <Animator active={show} duration={{ enter: 1, exit: 1 }}>
                <div style={{ position: 'relative', width: 400, height: 400 }}>
                    <FrameCircle
                    animated={true}
                    style={{
                        // @ts-expect-error css variables
                        '--arwes-frames-bg-color': 'hsla(180, 76.50%, 10.00%, 0.20)',
                        '--arwes-frames-line-color': 'hsl(180, 75%, 30%)',
                        '--arwes-frames-deco-color': 'hsl(180, 75%, 50%)'
                    }}
                />
                    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                        <Text
                        as="h1"
                        style={{
                            ...theme.font(0),
                            margin: theme.space([0, 0, 4]),
                            paddingBottom: theme.space(4),
                            color: theme.color.primary(4)
                          }}
                        >
                            WELCOME
                        </Text>
                        <ThemeButton
                        onClick={() => {setShow(false)}}
                        >
                            Proceed
                        </ThemeButton>
                    </div>
                </div>
            </Animator>
        </Container>
    )
}