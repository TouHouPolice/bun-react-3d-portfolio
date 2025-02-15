import { Animator, FrameLines, Text } from "@arwes/react";
import { Container } from "react-bootstrap";

interface WelcomeProps {
    show: boolean;
}

export default function Welcome({ show }: WelcomeProps) {
    return (
        <Container fluid className="welcome-container h-100">
            <Animator dismissed={!show}>
                <div style={{ position: 'relative', width: 300, height: 200 }}>
                    <FrameLines
                    style={{
                        // @ts-expect-error css variables
                        '--arwes-frames-bg-color': 'hsl(180, 75%, 10%)',
                        '--arwes-frames-line-color': 'hsl(180, 75%, 30%)',
                        '--arwes-frames-deco-color': 'hsl(180, 75%, 50%)',
                        opacity: 0.5,
                    }}
                    />
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                        <Text as="h1">WELCOME</Text>
                    </div>
                </div>
            </Animator>
        </Container>
    )
}