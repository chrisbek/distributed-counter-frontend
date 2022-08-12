import React from 'react';

export const SubstractIcon = props => {
    return (
        <svg className={props.className} onClick={props.onClick} width="496" height="496" viewBox="0 0 496 496" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M496 248C496 384.8 384.8 496 248 496C111.2 496 0 384.8 0 248C0 111.2 111.2 0 248 0C384.8 0 496 111.2 496 248Z"
                fill="#EF6060"/>
            <path d="M248 0C384.8 0 496 111.2 496 248C496 384.8 384.8 496 248 496" fill="#EA7777"/>
            <path d="M72.8008 72.8C169.601 -24 326.401 -24 423.201 72.8C520.001 169.6 520.001 326.4 423.201 423.2"
                  fill="#D34949"/>
            <path
                d="M352.799 256H143.199C136.799 256 131.199 254.4 131.199 248C131.199 241.6 136.799 240 143.199 240H352.799C359.199 240 364.799 241.6 364.799 248C364.799 254.4 359.199 256 352.799 256Z"
                fill="#EEFFFF"/>
        </svg>
    )
};
