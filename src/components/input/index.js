import React from 'react';
import styles from './index.module.css';

const Input = ({ name, value, type, label, placeholder, required, onKeyDown, onChange, step, onFocus }) => {
    return (
        <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor={name}>
                {label}
            </label>
            {
                type === 'textarea' ? <textarea className={styles.text__input} id={name} value={value} name={name} type={type} step={step} placeholder={placeholder} required={required} onKeyDown={onKeyDown} onChange={onChange} onFocus={onFocus} /> : <input className={styles.form__input} id={name} value={value} name={name} type={type} step={step} placeholder={placeholder} required={required} onKeyDown={onKeyDown} onChange={onChange} onFocus={onFocus}/>
            }
        </div>
    )
}

export default Input;