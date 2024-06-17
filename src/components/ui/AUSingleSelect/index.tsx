import { OptionType } from '@/constants/types/type';
import React, { ChangeEvent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import Image from 'next/image';

interface Option {
    id?: number
    value: string;
    label: string;
}

interface CustomSingleSelectProps {
    items: Option[];
    defaultValue?: Option;
    label: string;
    placeholder: string;
    height?: number;
    error?: string;
    loading?: boolean,
    register?: UseFormRegisterReturn;
    onChange?: (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    loadOptions?: (
        inputValue: string,
        callback: (options: OptionType[]) => void
    ) => void;
    defaultOptions?: any,
    indicatorOff?: boolean
    disabled?: boolean,
    value?: Option;
}


const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: '#F7F9FB', width: '476x', height: '60px', }),
    valueContainer: (styles) => ({
        ...styles,
        maxHeight: '49px',
        overflowY: 'auto',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
        fontWeight: 400,
    }),
    placeholder: (styles) => ({
        ...styles,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
        fontWeight: 400,
    }),
    menu: (styles) => ({
        ...styles,
        zIndex: 9999,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
        fontWeight: 400,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        backgroundColor: isDisabled
            ? undefined
            : isSelected
                ? "#14558b"
                : isFocused
                    ? `#14558b1A` // Add alpha channel to color for focused state
                    : undefined,
        color: isDisabled ? '#ccc' : isSelected ? 'white' : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
            ...styles[':active'],
            backgroundColor: !isDisabled ? '#14558b' : undefined,
        },
    }),
};

const AUSingleSelect: React.FC<CustomSingleSelectProps> = ({ items, error, onChange, loadOptions, defaultValue, ...props }) => (
    <>
        <div className=''>
            <div className='flex flex-row items-center'>
                <label className='text-sm text-[app-016] mb-1'>{props.label}</label>
                {(props.disabled) && <div><Image src='/images/NoEdit.svg' alt='non-edit' height={15} width={15} className="ml-1 mb-1"></Image></div>}
            </div>
            <AsyncSelect
                placeholder={props.placeholder}
                closeMenuOnSelect={true}
                defaultValue={defaultValue}
                defaultOptions={props.defaultOptions}
                options={items}
                isLoading={props.loading}
                onChange={onChange}
                loadOptions={loadOptions}
                value={props.value}
                isSearchable
                styles={{
                    ...colourStyles
                    , control: (styles) => ({
                        ...styles,
                        // fontSize:'14px',
                        backgroundColor: '#F7F9FB',
                        width: '476x',
                        height: props.height ? `${props.height}px` : '60px',
                        borderWidth: 'none'
                    }),
                    valueContainer: (styles) => ({
                        ...styles,
                        color: props.value?.id === 0 ? '#9290C3' : '#000000',
                        maxHeight: props.height ? `${props.height - 4}px` : '49px',
                        // fontSize:'14px',
                        fontWeight: 400,
                        overflowY: 'auto',
                        "::-webkit-scrollbar": {
                            width: "8px",
                            height: "0px",
                        },
                        "::-webkit-scrollbar-track": {
                            background: "#f1f1f1"
                        },
                        "::-webkit-scrollbar-thumb": {
                            background: "#888"
                        },
                        "::-webkit-scrollbar-thumb:hover": {
                            background: "#555"
                        }
                    }),
                    indicatorSeparator: (styles) => ({
                        ...styles,
                        display: 'none'
                
                    }),
                    indicatorsContainer: (styles) => ({
                        ...styles,
                        display: props.indicatorOff ? "none" : 'flex'
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        overflowY: 'auto',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: props.disabled ? '#000000' : undefined
                    }),
                }}
                isDisabled={props.disabled}
            />
            {error && <div className="text-xs text-red-500">{error}</div>}
        </div>
    </>
);

export default AUSingleSelect;