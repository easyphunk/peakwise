import React from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';
import getHeaderLinks from '../../utils/headerLinks';

const Header = () => {
    const linkList = getHeaderLinks();
    return (
        <header className={styles.header}>
            <Logo color="white" href="/" />
            <nav className={styles.nav}>
                {
                    linkList.map(link => {
                        if (link.title === "Profile") {
                            return (
                                <LinkComponent key={link.title} title={link.title} href={link.href} >
                                    <img className={styles["nav__user-img"]} src="/profile-photo-default.png" alt="profile" />

                                </LinkComponent>
                            )
                        } else {
                            return (
                                <LinkComponent key={link.title} title={link.title} href={link.href} />
                            )
                        }

                    })
                }
            </nav>
        </header>
    )
}

export default Header;