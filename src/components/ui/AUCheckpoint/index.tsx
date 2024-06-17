import React, { ChangeEvent } from "react";
import {Checkbox} from "@nextui-org/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface AUCheckpointProps {
    radius: "full" | "lg" | "md" | "sm" | "none",
    color: "default" | "primary" | "secondary" | "success" | "warning",
    checked: boolean,
    isDisabled: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AUCheckpoint: React.FC<AUCheckpointProps> = ({ ...props }) => {
    return (
        <>
            <Checkbox className="text-sky-400" checked={props.checked} radius={props.radius} color={props.color} isDisabled={props.isDisabled} onChange={props.onChange} icon={<CheckIcon style={{color:"white"}}/>}></Checkbox>
        </>
    );
}
export default AUCheckpoint