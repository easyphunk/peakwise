import React from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';

const Header = () => {
    return (
        <header className={styles.header}>
            <Logo color="white" href="/" />
            <nav className={styles.nav}>
                <LinkComponent href="/explore" title="Explore"/>
                <LinkComponent href="/create-article" title="Create Article"/>
                <LinkComponent href="/login" title="Login"/>
                <LinkComponent href="/register" title="Register"/>
                <a className={styles.nav__el} href="/profile"><span>Profile</span><img className={styles["nav__user-img"]} src="/profile-photo-default.png" alt="profile" /></a>
            </nav>
        </header>
    )
}

export default Header;