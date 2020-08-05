import React from 'react';
import styles from './index.module.css';
import Button from '../../components/button';

const RegisterPage = () => {
    return (
        <div className={styles["register-form"]}>
        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Create your account</h2>
        <form className={styles.form}>
            <div className={styles.form__group}><label className={styles.form__label} htmlFor="username">Username</label><input
                    className={styles.form__input} id="username" type="text" placeholder="username" required={true} /></div>
            <div className={styles.form__group}><label className={styles.form__label} htmlFor="email">Email address</label><input
                    className={styles.form__input} id="email" type="email" placeholder="you@example.com" required={true} /></div>
            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="password">Password</label><input
                    className={styles.form__input} id="password" type="password" placeholder="••••••••" required={true}/></div>
            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="rePassword">Repeat Password</label><input
                    className={styles.form__input} id="rePassword" type="password" placeholder="••••••••" required={true}/></div>
            <Button title="Register" href="#" stylePref="regular" />
        </form>
    </div>
    )
}

export default RegisterPage;