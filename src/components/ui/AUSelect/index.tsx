import { Select, SelectItem, SelectProps, SelectedItems } from '@nextui-org/react';
import React, { ChangeEvent } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Image from "next/image";

interface AUSelectItem {
  label: string,
  value: any,
  id: number
}

interface AUSelectProps extends Omit<SelectProps, 'children'> {
  items: AUSelectItem[],
  label?: string,
  placeholder?: string,
  register?: UseFormRegisterReturn;
  error?: FieldError;
  width?: number,
  selectedKeys?: string | string[]
  defaultSelectedKeys?: number[] | string;
  selectionMode?: "multiple"
  readOnly?: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}


const AUSelect: React.FC<AUSelectProps> = ({ label, placeholder, items, register, ...props }) => {

  const renderValue = (items: SelectedItems<AUSelectItem>) => {
    return <>
      <div className='flex gap-2'>
        {items.map((item, key) => <p className='text-sm px-3 py-1 rounded-sm text-white bg-app-014' key={key}>{item.textValue}</p>)}
      </div>
    </>
  }

  return (
    <>
      <div className="flex flex-col">
        {/* {label && <label className="text-sm text-[app-016] mb-1">{label}</label>} */}
        <div className='flex flex-row items-center'>
          <label className='text-sm text-[app-016] mb-1'>{label}</label>
          {(props.readOnly || props.disabled) && <div><Image src='/images/NoEdit.svg' alt='non-edit' height={15} width={15} className="ml-1 mb-1"></Image></div>}
        </div>
        <Select {...props} {...register} placeholder={placeholder} selectedKeys={props.selectedKeys} disabledKeys={["0"]} classNames={{ trigger: '!bg-app-006 h-auto min-h-[40px]', selectorIcon: 'text-app-007 w-[18px] h-[18px]', popoverContent: 'rounded-none bg-app-006 p-0', listbox: 'p-0', value: `${props.selectedKeys === '0' ? '!text-gray-400' : '!text-app-12' }` }} radius='none' size="sm"
          renderValue={props.selectionMode === 'multiple' ? renderValue : undefined} onChange={props.onChange}
          style={{ pointerEvents: props.readOnly ? 'none' : 'auto' }}
        >
          {items.map((item, key) =>
            <SelectItem classNames={{ base: 'bg-transparent rounded-none' }} value={item.value} key={item.id}>{item.label}</SelectItem>
            // <SelectItem classNames={{base:'bg-transparent rounded-none'}} value={item.value} key={props.selectionMode ? key: item.value}>{item.label}</SelectItem>
          )}
        </Select>
        {/* <Input className='bg-app w-full' radius='none' classNames={{inputWrapper:'!bg-app-004',input:'!placeholder-app-005 !text-app-001 text-md'}} placeholder={placeholder} startContent={iconType&&IconMap[iconType]} {...props} /> */}
      </div>
    </>
  );

};

export default AUSelect