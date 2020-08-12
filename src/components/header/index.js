import React, { useContext } from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';
import LinkAdmin from '../link-admin';
import getHeaderLinks from '../../utils/headerLinks';
import UserContext from '../../UserContext';

const Header = () => {
    const {
        user,
        loggedIn
    } = useContext(UserContext);

    const linkList = getHeaderLinks(loggedIn, user);

    return (
        <header className={styles.header}>
            <Logo color="white" href="/" />
            <nav className={styles.nav}>
                {
                    linkList.map(link => {
                        if (link.title === "Manage Content") {
                            return (
                                <LinkAdmin key={link.title} title={link.title} href={link.href} />
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

