import React, { useEffect } from 'react';
import styles from './index.module.css';
import Button from '../button';

const Landing = () => {
    useEffect(() => {
        document.title = 'Peakwise';
    })
    
    return (
        <section className={styles.wrapper}>
            <h1><span>PEAKWISE</span></h1>
            <h2>Adjust your altitude.</h2>
            <Button title="Login" href="/login" stylePref="orange" />
            <Button title="Register" href="/register" stylePref="wide" />
        </section>
    )
}

export default Landing;