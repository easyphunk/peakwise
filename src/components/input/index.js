import React from 'react';
import styles from './index.module.css';

const Input = ({ name, value, type, label, placeholder, required, keyPressHandler, onChange, step }) => {
    return (
        <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor={name}>
                {label}
            </label>
            {
                type === 'textarea' ? <textarea className={styles.text__input} id={name} value={value} name={name} type={type} step={step} placeholder={placeholder} required={required} onKeyDown={keyPressHandler} onChange={onChange} /> : <input className={styles.form__input} id={name} value={value} name={name} type={type} step={step} placeholder={placeholder} required={required} onKeyDown={keyPressHandler} onChange={onChange} />
            }
        </div>
    )
}

export default Input;