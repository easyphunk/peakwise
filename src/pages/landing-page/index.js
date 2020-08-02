import React from 'react';
import styles from './index.module.css';
import Button from '../../components/button';

const LandingPage = () => {
    return (
        <div className={styles.main}>
            <section className={styles.wrapper}>
                <h1><span>PEAKWISE</span></h1>
                <h2>Adjust your altitude.</h2>
                <Button title="Login" href="/login" orange={true} />
                <Button title="Register" href="/register" orange={false} />
            </section>
        </div>
    )
}

export default LandingPage;