import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Login from '../../components/login';

function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Login />
        </div>
    );
}

export default LoginPage;
