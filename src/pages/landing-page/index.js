import React from 'react';
import styles from './index.module.css';
import Button from '../../components/button';

const LandingPage = () => {
    return (
        <section className={styles.main}>
            <section className={styles.wrapper}>
                <h1><span>PEAKWISE</span></h1>
                <h2>Adjust your altitude.</h2>
                <Button title="Login" href="/login" stylePref="orange" />
                <Button title="Register" href="/register" stylePref="wide" />
            </section>
        </section>
    )
}

export default LandingPage;