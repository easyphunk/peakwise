import React, { useContext } from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';
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
                        if (link.title === "Profile") {
                            return (
                                <LinkComponent key={link.title} title={link.title} href={link.href} />
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

