import React from 'react';
import styles from './index.module.css';

const Button = ({ title, href, stylePref, toSubmit }) => {
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
        toSubmit === undefined ? <a className={styles[styleChoice]} href={href}>{title}</a> : <button className={styles[styleChoice]}>{title}</button>
    )
}

export default Button;