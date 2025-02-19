import { Animator, AnimatorDuration, Text } from "@arwes/react";
import Frame, { FrameType } from "@components/theme/Frame";
import {theme} from "@styles/Arwes";
import { addStyles } from "@utils/utils";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sub } from "three/webgpu";

type SidebarItemProps = {
    label: string,
    duration?: Partial<AnimatorDuration>,
    subItems?: any[] | null,
    active?: boolean,
}
function SidebarItem({label, duration, subItems, active}: SidebarItemProps){
    const navigate = useNavigate();

    const subItemComponents = useMemo(() => {
        if(subItems){
            return subItems.map((subItem: {label: string}, index: number) => {
                return (
                    <Text
                    as="li"
                    key={`sub-item-${index}`}
                    className="sidebar-sub-item"
                    onClick={() => {
                        const destPath = `/profile/${label.toLowerCase()}/${index}`;
                        console.log(destPath);
                        navigate(destPath, {replace: true});
                    }}
                    style={{
                        fontFamily: theme.font(0).fontFamily,
                        fontWeight: theme.font(0).fontWeight,
                        fontSize: "1.3rem",
                        color: theme.color.primary(4),
                    }}
                    >
                        {subItem.label}
                    </Text>
                )
            })
    }}, [subItems]);

    return (
        <Animator duration={duration}>
        <div className="sidebar-item-wrapper">
            <div 
            className={`sidebar-item ${active ? 'active' : ''}`}
            style={{
                pointerEvents: subItems ? 'none' : 'auto',
            }}
            onClick={() => {
                if(!subItems){
                    navigate("/profile/"+label.toLowerCase(), {replace: true});
                }
            }}
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
            {subItems && subItemComponents && (
                <ol className="sidebar-sub-items-wrapper">
                    {subItemComponents}
                </ol>
            )}

        </div>
        </Animator>
    )
}

export default function Sidebar(){
    const [profileData, setProfileData] = useState();
    const [sidebarItems, setSidebarItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        fetch('/resources/profile_data.json')
            .then(response => response.json())
            .then(data => {
                setProfileData(data)
            }
            )
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    useEffect(() => {
        if(profileData){
            // profile data is a json object, the key of each entry is the label of the sidebar item
            const items = Object.entries(profileData).map(([key, value]) => {
                // check if the value is an array [], if so, it is the subitems of the sidebar item
                return (
                    <SidebarItem
                    key={`sidebar-item-${key}`}
                    label={key}
                    subItems= {Array.isArray(value) ? value : null}
                    />
                )
            });
            setSidebarItems(items);
        }
    }, [profileData]);

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
            {sidebarItems}
        </div>
        </>
    )
}

addStyles(`
.sidebar-item-wrapper{
    margin-bottom: ${theme.space(2)};
}

.sidebar-item{
    width: 100%;
    border-bottom: 2px solid ${theme.color.primary(2)};
    margin-bottom: ${theme.space(2)};
    cursor: pointer;
}

.sidebar-item.active, .sidebar-item:hover, .sidebar-item:focus{
    border-bottom: 2px solid ${theme.color.secondary(4)};
}

.sidebar-item.active span, .sidebar-item:hover span, .sidebar-item:focus span {
    color: ${theme.color.secondary(4)};
}

.sidebar-sub-items-wrapper{
    margin-left: ${theme.space(2)};
}

.sidebar-sub-item{
    width: 100%;
    border-bottom: 1px solid ${theme.color.primary(2)};
    margin-bottom: ${theme.space(2)};
    cursor: pointer;
}

.sidebar-sub-item.active, .sidebar-sub-item:hover, .sidebar-sub-item:focus{
    border-bottom: 1px solid ${theme.color.secondary(4)};
}

.sidebar-sub-item.active span, .sidebar-sub-item:hover span, .sidebar-sub-item:focus span {
    color: ${theme.color.secondary(4)};
}

`)