import React, { ChangeEvent } from 'react'

interface InputGroupProps {
    itemLabel: string;
    type: string;
    value: string | number;
    onChangeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    step?: string;
    readOnly?: boolean;
    error?: string;
    min?: string;
    max?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
    itemLabel,
    type,
    value,
    onChangeFunc,
    placeholder,
    step,
    readOnly = false,
    error,
    min,
    max
}) => {
    const inputId = itemLabel.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2 space-x-7 ">
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700"
                >
                    {itemLabel}
                </label>
                <input
                    id={inputId}
                    onChange={onChangeFunc}
                    type={type}
                    value={value}
                    step={step}
                    readOnly={readOnly}
                    min={min}
                    max={max}
                    className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        } ${error ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={placeholder}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}

export default InputGroup