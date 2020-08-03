import React from 'react';
import styles from './index.module.css';

const Logo = ({ color, href }) => {
    return (
        <div className={styles.header__logo}>
            <a href={href ? href : '#'}><img src={`/logo-${color}.png`} alt="Logo" /></a>
        </div>
    )
}

export default Logo;