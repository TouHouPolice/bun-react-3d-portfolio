import { 
    Animated, AnimatedProp, cx, 
    styleFrameClipOctagon, 
    useBleeps, useFrameAssembler, FrameOctagon,
    Animator, Text
} 
from "@arwes/react"
import { Illuminator } from '@arwes/react-effects'
import { theme } from "@styles/Arwes"
import { memo, ReactNode, useRef } from "react"
import { BleepsNames } from "@styles/Arwes"
import { addStyles } from "@utils/utils"
type ButtonProps = {
    className?: string
    style?: React.CSSProperties
    color?: 'primary' | 'secondary'
    variant?: 'fill' | 'outline'
    animated?: AnimatedProp
    children: ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    active?: boolean
}

const ThemeButton = memo((props: ButtonProps): JSX.Element => {
    const { className, style, color = 'primary', variant = 'fill', animated, children, onClick, active = true } = props

    const bleeps = useBleeps<BleepsNames>()
    const frameRef = useRef<SVGSVGElement>(null)

    useFrameAssembler(frameRef)

    return (
        <Animator active={active} duration={{enter:2}}>
            <Animated<HTMLButtonElement>
                as="button"
                className={cx('theme-button', `theme-button-${color}`, `theme-button-${variant}`, className)}
                style={style}
                animated={['fade', ...(Array.isArray(animated) ? animated : [animated])]}
                onMouseEnter={() => {
                    bleeps.hover?.play()
                }}
                onClick={(event) => {
                    bleeps.click?.play()
                    onClick?.(event)
                }}
                >
                 <div className="theme-button-back">
                    <Illuminator size={theme.spacen(50)} color={theme.color[color](3, { alpha: 0.2 })} />
                </div> 
                <FrameOctagon elementRef={frameRef} style={{ zIndex: 0 }} squareSize={theme.spacen(2)} />
                <Text as="div" className="theme-button-content">
                    {children}
                </Text>
            </Animated>
        </Animator>
        )
    }
)

export default ThemeButton



addStyles(`
.theme-button {
    position: relative;
    display: inline-flex;
    outline: none;
    margin: 0;
    border: none;
    padding: 0 ${theme.space(8)};
    line-height: ${theme.space(8)};
    font-size: 0.75rem;
    font-family: ${theme.font(0).fontFamily};
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${theme.color.primary(5)};
    background: transparent;
    cursor: pointer;
    user-select: none;
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
}

.theme-button-back {
    position: absolute;
    inset: 0;
    overflow: hidden;
    clip-path: ${styleFrameClipOctagon({ squareSize: theme.spacen(2) })};
}

.theme-button-content {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${theme.space(2)};
}

.theme-button:hover .theme-button-content{
    color: ${theme.color.secondary(4)};
}

.theme-button .arwes-frames-framesvg {
    transition-property: opacity, transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
}
.theme-button:hover .arwes-frames-framesvg,
.theme-button:focus .arwes-frames-framesvg {
    transform: scale(1.05);
}
.theme-button [data-frame] {
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
}
.theme-button [data-name=line] {
    color: ${theme.color.primary(5)};
}
.theme-button:hover [data-name=line],
.theme-button:focus [data-name=line] {
    color: ${theme.color.primary(4)};
}
.theme-button [data-name=bg] {
    color: ${theme.color.primary(9)};
}
.theme-button:hover [data-name=bg],
.theme-button:focus [data-name=bg] {
    color: ${theme.color.primary(8)};
}

.theme-button-secondary {
    color: ${theme.color.secondary(5)};
}
.theme-button-secondary [data-name=line] {
    color: ${theme.color.secondary(5)};
}
.theme-button-secondary:hover [data-name=line],
.theme-button-secondary:focus [data-name=line] {
    color: ${theme.color.secondary(4)};
}
.theme-button-secondary [data-name=bg] {
    color: ${theme.color.secondary(9)};
}
.theme-button-secondary:hover [data-name=bg],
.theme-button-secondary:focus [data-name=bg] {
    color: ${theme.color.secondary(8)};
}

.theme-button-fill {}

.theme-button-outline {}
.theme-button-outline [data-name=bg] {
    display: none;
}
`)