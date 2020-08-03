import React from 'react';
import styles from './index.module.css';

const Button = ( { title, href, stylePref} ) => {
    let styleChoice = '';
    switch (stylePref) {
        case 'orange':
            styleChoice = 'btn-orange';
            break;
        case 'regular':
            styleChoice = 'btn-regular';
            break;
        case 'wide':
            styleChoice = 'btn';
            break;
        default:
            styleChoice = 'btn';
    }

    return (
        <a className={styles[styleChoice]} href={href}>{title}</a>
    )
}

export default Button;