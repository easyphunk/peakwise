import React from 'react';
import styles from './index.module.css';
import LinkComponent from '../link';

const SideNav = (props) => {
    const userid = '#';
    return (
        <nav className={styles["user-view__menu"]}>
            <ul className={styles["side-nav"]}>
                <li><LinkComponent href={`/settings/${userid}`} title="Settings"/></li>
                <li><LinkComponent href={`/favorites/${userid}`} title="Favorite Peaks"/></li>
                <li><LinkComponent href={`/conquered/${userid}`} title="Conquered Peaks"/></li>
                <li><LinkComponent href={`/journal/${userid}`} title="My Journal"/></li>
                <li>&nbsp;</li>
                <li><LinkComponent href={'/logout'} title="Logout"/></li>
            </ul>
        </nav>
    )
}

export default SideNav;