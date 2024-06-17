import { ArrowRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Button, ButtonProps } from '@nextui-org/react';
import React from 'react'

type IconTypes = "ADD" | "RIGHT"
interface ButtonNewProps extends ButtonProps {
  buttontype: "primary" | "secondary" | "outline" | "default" | "danger" | "application" | "delete" | "allProjects"
  isLoading?: boolean,
  beforeImage?: IconTypes,
  afterImage?: IconTypes,
  type?: "submit" | "button"
}
const IconProps = { height: 20, width: 20 }
const IconMap = {
  "ADD": <PlusIcon {...IconProps} />,
  "RIGHT": <ArrowRightIcon {...IconProps} />
}

const AUButton: React.FC<ButtonNewProps> = ({ isLoading, children, beforeImage, afterImage, type, ...props }) => {

  const commonStyles = "rounded-sm border-[0px] border-app-003 text-md px-4 py-4"

  const buttonStyles = {
    'primary': "bg-app-003 text-app-001 w-44",
    'secondary': "bg-app-001 text-app-003",
    'outline': "bg-app-none text-app-003 border-[1px] border-app-003",
    'default': "rounded bg-app-008 text-app-001 text-sm px-3 py-3 pl-3 pr-3",
    'danger': "rounded bg-app-none text-danger-400 border-[1px] border-danger-400",
    'application': "bg-app-003 text-app-001 border-[1px] border-app-003",
    'delete': "bg-app-001 text-app-018 border-[1px] border-app-018",
    'allProjects' : "bg-app-019 text-app-008 font-medium"
  }
  const buttonStyle = buttonStyles[props.buttontype]
  return (
    <>
      <Button className={`${commonStyles} ${buttonStyle}`} onClick={props.onClick} isLoading={isLoading} type={type}>
        {beforeImage&&IconMap[beforeImage]}
        {children}
        {afterImage&&IconMap[afterImage]}
      </Button>
    </>
  );
};

export default AUButton