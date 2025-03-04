"use client"
import React from 'react';

interface TextFieldProps {
    name: string;
    label: string;
    placeholder: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, placeholder, value, handleChange, error }) => {

    return (
        <div className="flex flex-col gap-1">
            <label className="font-normal text-base">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={handleChange}
            />
            <p className="h-4 text-sm text-red-500">{error}</p>
        </div>
    );
};

export default TextField;