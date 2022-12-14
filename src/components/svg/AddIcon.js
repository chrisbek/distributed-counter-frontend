import React from 'react';

export const AddIcon = props => {
    return (
        <svg className={props.className} onClick={props.onClick} width="496" height="496" viewBox="0 0 496 496" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M496 248C496 384.8 384.8 496 248 496C111.2 496 0 384.8 0 248C0 111.2 111.2 0 248 0C384.8 0 496 111.2 496 248Z"
                fill="#60EF88"/>
            <path d="M248 0C384.8 0 496 111.2 496 248C496 384.8 384.8 496 248 496" fill="#A4EEB8"/>
            <path d="M72.8008 72.8C169.601 -24 326.401 -24 423.201 72.8C520.001 169.6 520.001 326.4 423.201 423.2"
                  fill="#49D370"/>
            <path
                d="M352.799 256H143.199C136.799 256 131.199 254.4 131.199 248C131.199 241.6 136.799 240 143.199 240H352.799C359.199 240 364.799 241.6 364.799 248C364.799 254.4 359.199 256 352.799 256Z"
                fill="#EEFFFF"/>
            <path
                d="M248 364C241.6 364 240 359.2 240 352V143.2C240 136.8 241.6 131.2 248 131.2C254.4 131.2 256 136 256 143.2V352.8C256 359.2 254.4 364 248 364Z"
                fill="#EEFFFF"/>
        </svg>
    )
};
