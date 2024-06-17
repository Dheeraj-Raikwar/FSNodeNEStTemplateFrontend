import React, { ChangeEvent } from "react";
import { Switch, SwitchProps } from "@nextui-org/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface AUSwitchProps extends  SwitchProps {
    switchType: "primary" | "secondary" | "success"
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AUSwitch: React.FC<AUSwitchProps> = ({ ...props }) => {
    return (
        <>
            <Switch checked={props.checked} color={`${props.switchType}`} size={props.size} thumbIcon={ props.checked ? <XMarkIcon/> : <CheckIcon/>} onChange={props.onChange} aria-label="Switch" />
        </>
    );

};

export default AUSwitch