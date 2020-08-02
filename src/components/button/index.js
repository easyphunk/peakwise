import React from 'react';
import styles from './index.module.css';

const Button = ( { title, href, orange} ) => {
    return (
        <a className={styles[orange ? 'btn--orange' : 'btn']} href={href}>{title}</a>
    )
}

export default Button;