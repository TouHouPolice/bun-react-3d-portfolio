import {Animator} from "@arwes/react";
import {theme} from '@styles/Arwes'
import ThemeButton from "@components/theme/Button";
import Frame, { FrameType } from "@components/theme/Frame";
import { useNavigate } from "react-router-dom";
import Text from "@components/theme/Text";
interface WelcomeProps {
}

export default function Welcome({}: WelcomeProps) {
    const navigate = useNavigate();

    return (
        <div className="welcome-container h-100">
            <Animator active={true} duration={{ enter: 1, exit: 1 }}>
                <div style={{ position: 'relative', width: 400, height: 400 }}>
                    <Frame
                    type={FrameType.CIRCLE}
                    style={{ width: 400, height: 400 }}
                    >
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
                        <Text>Click to activate sounds</Text>
                        <ThemeButton
                        onClick={() => {navigate('/profile')}}
                        >
                            Proceed
                        </ThemeButton>
                    </div>
                    </Frame>
                </div>
            </Animator>
        </div>
    )
}