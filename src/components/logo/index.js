import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Logo = ({ color, href }) => {
    return (
        <div className={styles.header__logo}>
            <Link to={href ? href : '#'}><img src={`/logo-${color}.png`} alt="Logo" /></Link>
        </div>
    )
}

export default Logo;