import { EnvelopeIcon, LockClosedIcon as LockClosedIcon } from '@heroicons/react/24/outline';
import { Button, ButtonProps, Input, InputProps } from '@nextui-org/react';
import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Image from "next/image";

interface InputNewProps extends InputProps {
  placeholder?: string,
  iconType?: 'MAIL' | 'LOCK',
  kind: 'primary' | 'secondary'
  register?: UseFormRegisterReturn; 
  error?: FieldError,
  disabled?: boolean,
  width?: number,
  type?: string,
  color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger' | undefined
}
const IconKindMap = {
  'primary':'text-app-007 mr-2 font-bold',
  'secondary':'text-app-001 mr-2 font-bold',
}
const KindMap = {
  'primary': {inputWrapper:'!bg-app-006',input:'!placeholder-app-013 !text-app-012 text-sm'},
  'secondary': {inputWrapper:'!bg-app-007',input:'!placeholder-white !text-app-001 text-md'},
}


const AUInput: React.FC<InputNewProps> = ({ iconType, register, error, label, ...props }) => {
  
  const IconProps = { height: 30, width: 30, className: IconKindMap[props.kind] }
  const IconMap = {
    "MAIL": <EnvelopeIcon {...IconProps} />,
    "LOCK": <LockClosedIcon {...IconProps} />
  }
  
  return (
    <>
    <div className='flex flex-row items-center'>
      <label className='text-sm text-[app-016] mb-1'>{label}</label>
      {/* {(props.readOnly || props.disabled) && <div><Image src='/images/NoEdit.svg' alt='non-edit' height={15} width={15} className="ml-1 mb-1"></Image></div>} */}
      </div>
      <Input radius='none' disabled={props.disabled ? props.disabled : false} width={props.width} {...register} classNames={KindMap[props.kind]} color={props.color} placeholder={props.placeholder} startContent={iconType&&IconMap[iconType]} {...props}/>
      {error&& <p>{error.message}</p> }
    </>
  );
  
};

export default AUInput