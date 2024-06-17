import React, { ChangeEvent } from "react";
import { InputProps, Textarea } from "@nextui-org/react";
import { UseFormRegisterReturn } from "react-hook-form";
import Image from "next/image";

interface CustomTextareaProps extends InputProps {
  variants: "flat" | "faded" | "bordered" | "underlined";
  register?: UseFormRegisterReturn;
  label?: string;
  labelPlacement?: "outside",
  placeholder?: string,
  defaultValue?: string,
  readonly?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AUTextarea: React.FC<CustomTextareaProps> = ({ variants, register, readOnly, ...props }) => {

  return (
    <>
      <div className='flex flex-row items-center'>
        <label className='text-sm text-[app-016] mb-1'>{props.label}</label>
        {(readOnly || props.disabled) && <div><Image src='/images/NoEdit.svg' alt='non-edit' height={15} width={15} className="ml-1 mb-1"></Image></div>}
      </div>
      <div className="w-full grid grid-cols-12 gap-4">
        <Textarea
          variant={variants}
          {...register}
          // label={props.label}
          labelPlacement="outside"
          defaultValue={props.defaultValue}
          maxRows={4}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className="col-span-12 md:col-span-12 mb-6 md:mb-0"
          classNames={{ inputWrapper: "!bg-app-006 rounded-none" }}
          disabled={readOnly}
        />
      </div>
    </>
  );
}

export default AUTextarea;