import React from 'react';
import styles from './index.module.css';
import LinkComponent from '../link'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <a href="/explore"><img src="/logo-white.png" alt="Logo" /></a>
            </div>
            <nav className={styles.nav}>
                <LinkComponent href="/explore" title="Explore"/>
                <LinkComponent href="/create-article" title="Create Article"/>
                <LinkComponent href="/login" title="Login"/>
                <LinkComponent href="/register" title="Register"/>
                <a className={styles.nav__el} href="/profile"><img className={styles["nav__user-img"]} src="/profile-photo-default.png" alt="profile photo" /><span>Profile</span></a>
            </nav>
        </header>
    )
}

export default Header;