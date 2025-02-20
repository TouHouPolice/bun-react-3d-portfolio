import { theme } from "@styles/Arwes";
import { Animator, AnimatorDuration, Text as ArwesText } from "@arwes/react";

type TextProps = {
    as?: keyof HTMLElementTagNameMap
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    decipher?: boolean,
    duration?: Partial<AnimatorDuration>
}

export default function Text({ as, children, style, className, onClick, onMouseEnter, decipher = false, duration = {enter:3} } : TextProps) {
    return (
        <Animator duration={duration}>
            <ArwesText
            as={as}
            blink
            blinkDuration={0.1}
            className={className || undefined}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            manager={decipher ? "decipher" : "sequence"}
            easing={decipher ? "outSine" : "linear"}
            fixed={decipher}
            style={{
                pointerEvents: 'auto',
                fontFamily: theme.font(0).fontFamily,
                fontWeight: theme.font(0).fontWeight,
                color: theme.color.primary(4),
                ...style
            }}
            >
                {children}
            </ArwesText>
        </Animator>
    )
}