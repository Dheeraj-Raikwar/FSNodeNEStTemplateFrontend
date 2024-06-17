import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/react";

interface AvatarProps {
    name: string,
    src: string,
}

const AUAvatar: React.FC<AvatarProps> = ({ ...props }) => {
    
    return (
        <div>
            <Avatar showFallback name={props.name} src={props.src} />
        </div>
    );
};

export default AUAvatar;