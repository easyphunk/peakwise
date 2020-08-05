import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Register from '../../components/register';

function RegisterPage() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Register />
        </div>
    );
}

export default RegisterPage;
