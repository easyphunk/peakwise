import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const LinkComponent = (props) => {
    return (
        <Link className={styles.nav__el} to={props.href}>{props.title}{props.children}</Link>
    )
}

export default LinkComponent;