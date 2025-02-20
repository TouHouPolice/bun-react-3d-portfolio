import { Animator, AnimatorDuration } from "@arwes/react";
import Frame, { FrameType } from "@components/theme/Frame";
import {theme} from "@styles/Arwes";
import { addStyles } from "@utils/utils";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Text
 from "@components/theme/Text";
type SidebarItemProps = {
    label: string,
    duration?: Partial<AnimatorDuration>,
    subItems?: any[] | null,
    selectedItem?: string | null,
    selectedSubItem?: string | null,
    onItemSelect?: React.Dispatch<React.SetStateAction<string | null>>,
    onSubItemSelect?: React.Dispatch<React.SetStateAction<string | null>>,
}

function SidebarItem({
    label, duration, subItems, selectedItem, 
    selectedSubItem, onItemSelect, onSubItemSelect
}: SidebarItemProps){
    const navigate = useNavigate();
    const [subItemComponents, setSubItemComponents] = useState<JSX.Element[] | null>(null);
    const [itemActive, setItemActive] = useState<boolean>(false);
    useEffect(() => {
        if(selectedItem){
            setItemActive(selectedItem.toLowerCase() === label.toLowerCase());
        }
    },[selectedItem, label]);

    useEffect(() => {
        if(subItems){
            const components = subItems.map((subItem: {label: string}, itemIndex: number) => {
                const subItemActive = selectedSubItem && itemActive &&
                selectedSubItem.toLowerCase() === subItem.label.toLowerCase();
                return (
                    <Text
                    as="li"
                    key={`sub-item-${itemIndex}`}
                    className={`sidebar-sub-item ${subItemActive ? 'active' : ''}`.trim()}
                    onClick={() => {
                        onItemSelect && onItemSelect(label);
                        onSubItemSelect && onSubItemSelect(subItem.label);
                        const destPath = `/profile/${label.toLowerCase()}/${itemIndex}`;
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
            });
            setSubItemComponents(components);
        }
    }, [itemActive, subItems, selectedItem, selectedSubItem, onSubItemSelect, onItemSelect, label]);

    return (
        <Animator duration={duration}>
        <div className="sidebar-item-wrapper">
            <div 
            className={`sidebar-item ${itemActive ? 'active' : ''}`}
            style={{
                pointerEvents: subItems ? 'none' : 'auto',
            }}
            onClick={() => {
                onItemSelect && onItemSelect(label);
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

type SidebarProps = {
    profileData?: object
}

export default function Sidebar( {profileData}: SidebarProps ){
    const [sidebarItems, setSidebarItems] = useState<JSX.Element[]>([]);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

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
                    selectedItem={selectedItem}
                    selectedSubItem={selectedSubItem}
                    onItemSelect={setSelectedItem}
                    onSubItemSelect={setSelectedSubItem}
                    />
                )
            });
            setSidebarItems(items);
        }
    }, [profileData, selectedItem, selectedSubItem, setSelectedItem, setSelectedSubItem]);

    return (
        <>
        <Frame 
        style={{
            width: '100%', 
            position:"relative",
            height: "auto"
        }}
        type={FrameType.OCTAGON}
        >
        <div
        style={{
            position:"relative",
            width: '100%',

            display: 'flex',
            flexDirection: 'column',
            padding: theme.space(4),
        }}
        >
            {sidebarItems}
        </div>
        </Frame>

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
    pointer-events: auto;
}

.sidebar-sub-item.active, .sidebar-sub-item:hover, .sidebar-sub-item:focus{
    border-bottom: 1px solid ${theme.color.secondary(4)};
}

.sidebar-sub-item.active span, .sidebar-sub-item:hover span, .sidebar-sub-item:focus span {
    color: ${theme.color.secondary(4)};
}

`)