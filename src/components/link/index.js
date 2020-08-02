import React from 'react';
import styles from './index.module.css';

const LinkComponent = ({ title, href }) => {
    return (
        <a className={styles.nav__el} href={href}>{title}</a>
    )
}

export default LinkComponent;