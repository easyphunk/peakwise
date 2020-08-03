import React from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__logo}><Logo color="white" href="/" /></div>
            <ul className={styles.footer__nav}>
                <li><LinkComponent title="About us" href="/about" /></li>
                <li><LinkComponent title="Download apps" href="/download-app" /></li>
                <li><LinkComponent title="Contact" href="/contact" /></li>
            </ul>
            <p className={styles.footer__copyright}>PEAKWISE. Created by Svetoslav Popov. Practice project with the MERN stack</p>
        </footer>
    )
}

export default Footer;