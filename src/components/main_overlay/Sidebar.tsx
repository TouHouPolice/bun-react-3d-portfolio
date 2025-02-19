import { Animator, AnimatorDuration, Text } from "@arwes/react";
import Frame, { FrameType } from "@components/theme/Frame";
import {theme} from "@styles/Arwes";
import { addStyles } from "@utils/utils";
import { useState } from "react";

type SidebarItemProps = {
    label: string,
    duration?: Partial<AnimatorDuration>,
    subItems?: [],
    active?: boolean,
    onClick?: () => void
}
function SidebarItem({label, duration, subItems, active, onClick}: SidebarItemProps){

    return (
        <Animator duration={duration}>
        <div 
        className={`sidebar-item ${active ? 'active' : ''}`}
        onClick={onClick}
        >
            <Text
            as="div"
            style={{
                textTransform: 'uppercase',
                fontStyle: 'italic',
                fontFamily: theme.font(0).fontFamily,
                fontWeight: theme.font(0).fontWeight,
                fontSize: "1.5rem",
                color: theme.color.primary(4),
            }}
            >
                {label}
            </Text>
        </div>
        </Animator>
    )
}

export default function Sidebar(){
    const [activeItem, setActiveItem] = useState<string>();

    return (
        <>
        <Frame 
        style={{width: '100%', height: '100%'}}
        type={FrameType.OCTAGON}
        />
        <div
        style={{
            position:"relative",
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.space(4),
        }}
        >
            <SidebarItem label="Projects" active={activeItem==="Projects"} onClick={()=>{setActiveItem("Projects");}}/>
            <SidebarItem label="Projects"/>
            <SidebarItem label="Projects"/>
            <SidebarItem label="Projects"/>
        </div>
        </>
    )
}

addStyles(`
.sidebar-item {
    width: 100%;
    height: 100%;
    border-bottom: 2px solid ${theme.color.primary(2)};
    margin-bottom: ${theme.space(4)};
    cursor: pointer;
}

.sidebar-item.active, .sidebar-item:hover, .sidebar-item:focus{
    border-bottom: 2px solid ${theme.color.secondary(4)};
}

.sidebar-item.active span, .sidebar-item:hover span, .sidebar-item:focus span {
    color: ${theme.color.secondary(4)};}
`)