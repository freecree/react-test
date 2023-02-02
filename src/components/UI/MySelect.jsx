import React from 'react'

export default function MySelect({onChange, value, defaultName, options}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="" disabled>{defaultName}</option>
            {options.map(option => 
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </select>
    )
}