import { Animator, 
    FrameLines, 
    FrameOctagon, 
    FrameUnderline, 
    FrameCorners,
    FrameNero,
    FrameNefrex,
    FrameKranox,
    FrameCircle,
    FrameHeader
} from "@arwes/react";
import {theme} from "@styles/Arwes";
import { useMemo } from "react";

export enum FrameType {
    LINES,
    UNDERLINE,
    CORNERS,
    OCTAGON,
    NERO,
    NEFREX,
    KRANOX,
    CIRCLE,
    HEADER
}

type FrameProps = {
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
    type?: FrameType
}

export default function Frame( { className='', style={}, type, children}: FrameProps ): JSX.Element {
    const frameStyle: React.CSSProperties = {
        // @ts-expect-error css variables
        '--arwes-frames-bg-color': `${theme.color.primary(9, {alpha: 0.3})}`, // 'hsl(180, 75%, 10%)',
        '--arwes-frames-line-color': `${theme.color.primary(3)}`, // 'hsl(180, 75%, 30%)',
        '--arwes-frames-deco-color': `${theme.color.primary(0)}` //'hsl(180, 75%, 50%)'
    }

    const frameComponent = useMemo(() => {
        switch (type) {
            case FrameType.LINES:
                return <FrameLines style={frameStyle} />
            case FrameType.UNDERLINE:
                return <FrameUnderline style={frameStyle} />
            case FrameType.OCTAGON:
                return <FrameOctagon style={frameStyle} />
            case FrameType.NERO:
                return <FrameNero style={frameStyle} />
            case FrameType.NEFREX:
                return <FrameNefrex style={frameStyle} />
            case FrameType.KRANOX:
                return <FrameKranox style={frameStyle} />
            case FrameType.CIRCLE:
                return <FrameCircle style={frameStyle} />
            case FrameType.HEADER:
                return <FrameHeader style={frameStyle} contentLength={60}/>
            case FrameType.CORNERS:
            default:
                return <FrameCorners style={frameStyle} />
        }
    } , [type])
    return (
        <Animator>
          <div
          className={`theme-frame ${className}`.trim()}
          style={{ ...style }}
          >
            {frameComponent}
            {children}
          </div>
        </Animator>
      )
}