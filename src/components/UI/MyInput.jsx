import React from 'react'

export default function MyInput({value, ...props}) {
    return (
        <div>
            <input className="myInput" {...props} type="text" value={value}/>
        </div>
    )
}