import React, { Component } from 'react';
import styles from './index.module.css';
import Logo from '../logo';
import LinkComponent from '../link';
import getHeaderLinks from '../../utils/headerLinks';
import UserContext from '../../UserContext';

class Header extends Component {
    
    static contextType = UserContext;
    
    render() {
        const {
            loggedIn,
            user
        } = this.context;
        
        const linkList = getHeaderLinks(loggedIn, user);
        
        return (
            <header className={styles.header}>
                <Logo color="white" href="/" />
                <nav className={styles.nav}>
                    {
                        linkList.map(link => {
                            if (link.title === "Profile") {
                                return (
                                    <LinkComponent key={link.title} title={link.title} href={link.href} >
                                        <img className={styles["nav__user-img"]} src={this.context.loggedIn ? `${this.context.user.profilePhoto}` : "https://res.cloudinary.com/dghpuejpt/image/upload/v1596715544/img/profile-photo-default2_gilumy.png"} alt="profile" />
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
}

export default Header;