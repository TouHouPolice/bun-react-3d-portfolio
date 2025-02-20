import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

type ProjectProps = {
    projectsData?: Array<object>,
}
export default function Project( {projectsData}: ProjectProps ) {
    const { index } = useParams<{index: string}>();
    const projectData = useMemo(() => {
        let i = 0;
        if (index) {
            i = parseInt(index, 10);
        }
        if (projectsData && !isNaN(i)) {
            console.log(projectsData[i]);
            return projectsData[i];
        }
        return null;
    }, [projectsData, index]);

    return (
        <div className="w-100">
            <h1>Project</h1>
        </div>
    )
}