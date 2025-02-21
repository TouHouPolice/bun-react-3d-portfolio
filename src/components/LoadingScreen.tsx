import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = useState(58);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    setLoading(false);
                    clearInterval(interval);
                    return 100;
                }
                const diff = Math.random() * 40;
                return Math.min(oldProgress + diff, 100);
            });
        }, 400);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={`loading-screen ${loading ? '' : 'fade-out'}`}>
            <div className="progress-bar-wrapper">
                <ProgressBar animated now={progress} label={`${Math.floor(progress)}%`} />
                <p>Optimizing your patience... please wait.</p>
            </div>
            
        </div>
    )
}

export default LoadingScreen;