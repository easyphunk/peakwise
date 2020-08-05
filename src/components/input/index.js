import React from 'react';
import styles from './index.module.css';

const Input = ({ name, type, value, label, placeholder, required, keyPressHandler, onChange }) => {
    return (
        <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor={name}>
                {label}
            </label>
            <input className={styles.form__input} id={name} name={name} type={type} value={value} placeholder={placeholder} required={required} onKeyDown={keyPressHandler} onChange={onChange} />
        </div>
    )
}

export default Input;