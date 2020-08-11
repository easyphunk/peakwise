import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const Button = ({ title, href, stylePref, toSubmit, onClick, disabled }) => {

    return (
        toSubmit === undefined ? <Link className={styles[`btn-${stylePref}`]} to={href ? href : '#'} onClick={onClick}>{title}</Link> : <button type="submit" className={styles[`btn-${stylePref}`]} onClick={onClick} disabled={disabled}>{title}</button>
    )
}

export default Button;