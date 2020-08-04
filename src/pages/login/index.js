import React from 'react';
import styles from './index.module.css';
import Button from '../../components/button';

const LoginPage = () => {
    return (
        <div className={styles["login-form"]}>
        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Log into your account</h2>
        <form className={styles.form + ' ' + styles["form--login"]}>
            <div className={styles.form__group}><label className={styles.form__label} for="email">Email address</label><input
                    className={styles.form__input} id="email" type="email" placeholder="you@example.com" required="" /></div>
            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} for="password">Password</label><input
                    className={styles.form__input} id="password" type="password" placeholder="••••••••" required=""/></div>
            <Button title="Login" href="#" stylePref="regular" />
        </form>
    </div>
    )
}

export default LoginPage;