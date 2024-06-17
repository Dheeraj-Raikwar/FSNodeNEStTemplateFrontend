import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import Image from 'next/image';

interface Option {
    value: string;
    label: string;
}

interface CustomMultiSelectProps {
    items: Option[];
    defaultValue?: MultiValue<Option>;
    label?: string;
    placeholder: string;
    height?: number;
    error?: string;
    register?: UseFormRegisterReturn;
    onChange?: (selectedOptions: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
    disabled?: boolean,
    value?: MultiValue<Option> | null | undefined;
    indicatorOff?: boolean
    width?: string
}


const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: '#F7F9FB', width: '476x', height: '60px', }),
    valueContainer: (styles) => ({
        ...styles,
        maxHeight: '49px',
        overflowY: 'auto',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
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
    placeholder: (styles) => ({
        ...styles,
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: '14px',
    }),
    menu: (styles) => ({
        ...styles,
        zIndex: 9999,
        fontSize:'14px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontWeight: 400,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        fontSize: '14px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontWeight: 400,
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
    multiValue: (styles) => ({
        ...styles,
        // fontSize:'14px',
        backgroundColor: `#14558b`, // Add alpha channel to color for multi-value
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        fontSize: '14px',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        color: 'white', // Use inherited color for multi-value label
        maxWidth: 'calc(100% - 22px)', // Adjust to leave space for remove button
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        // fontSize:'14px',
        color: 'white', // Use inherited color for multi-value remove button
        ':hover': {
            backgroundColor: '#F1948A', // Use inherited background color on hover
            color: 'inherit', // Use inherited color on hover
        },
    }),
};

const AUMultiSelect: React.FC<CustomMultiSelectProps> = ({ items, error, onChange, defaultValue, ...props }) => (
    <>
        <div className=''>
            <div className='flex flex-row items-center'>
                <label className='text-sm text-[app-016] mb-1'>{props.label}</label>
                {(props.disabled) && <div><Image src='/images/NoEdit.svg' alt='non-edit' height={15} width={15} className="ml-1 mb-1"></Image></div>}
            </div>
            <Select
                placeholder={props.placeholder}
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                isMulti
                options={items}
                onChange={onChange}
                value={props.value}
                styles={{
                    ...colourStyles
                    , control: (styles) => ({
                        ...styles,
                        // fontSize:'14px',
                        backgroundColor: '#F7F9FB',
                        width: props.width ? props.width : '476x',
                        height: props.height ? `${props.height}px` : '60px',
                        borderWidth: 'none'
                    }),
                    valueContainer: (styles) => ({
                        ...styles,
                        maxHeight: props.height ? `${props.height - 4}px` : '49px',
                        // fontSize:'14px',
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
                }}
                isDisabled={props.disabled}
            />
            {error && <div className="text-xs text-red-500">{error}</div>}
        </div>
    </>
);

export default AUMultiSelect;