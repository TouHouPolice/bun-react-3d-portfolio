import { Animator } from "@arwes/react-animator";
import Text from "./theme/Text";
const MobileBlocker: React.FC = () => {
    return (
        <div className="mobile-block">
            <i className="fas fa-3x fa-exclamation-triangle"></i>
            <Animator>
                <Text style={{marginTop:"1rem"}} as="div">
                    Unsupported platform detected.
                    <br/>Please use a PC browser for the best experience
                    <br/>:)
                </Text>
            </Animator>
        </div>
    );
}

export default MobileBlocker;