import React from 'react';
import classes from './MyButton.module.css';

export default function MyButton({children, className, ...props}) {
    return (
        <div>
            <button className={classes.myBtn+' '+className} {...props} >
                {children}
            </button>
        </div>
    )
}