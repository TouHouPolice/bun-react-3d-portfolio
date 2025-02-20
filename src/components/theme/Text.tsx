import { theme } from "@styles/Arwes";
import { Text as ArwesText } from "@arwes/react";

type TextProps = {
    as?: keyof HTMLElementTagNameMap
    children: React.ReactNode
    style?: React.CSSProperties
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Text({ as, children, style, className, onClick } : TextProps) {
    return (
        <ArwesText
        as={as}
        className={className || undefined}
        onClick={onClick}
        style={{
            fontFamily: theme.font(0).fontFamily,
            fontWeight: theme.font(0).fontWeight,
            color: theme.color.primary(4),
            ...style
        }}
        >
            {children}
        </ArwesText>
    )
}