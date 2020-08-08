import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import ProfileSettings from '../profile-settings'
import { withRouter } from 'react-router-dom';


const Profile = () => {
    const [settings, setSettings] = useState(true);
    const [favorites, setFavorites] = useState(false);
    const [conquered, setConquered] = useState(false);
    const [journal, setJournal] = useState(false);

    const handleClick = (e) => {
        switch (e.target.name) {
            case 'settings':
                setSettings(true);
                setFavorites(false);
                setConquered(false);
                setJournal(false);
                break;
            case 'favorites':
                setSettings(false);
                setFavorites(true);
                setConquered(false);
                setJournal(false);
                break;
            case 'conquered':
                setSettings(false);
                setFavorites(false);
                setConquered(true);
                setJournal(false);
                break;
            case 'journal':
                setSettings(false);
                setFavorites(false);
                setConquered(false);
                setJournal(true);
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles["user-view"]}>
            <nav className={styles["user-view__menu"]}>
                <ul className={styles["side-nav"]}>
                    <li><Link to="#" name="settings" onClick={(e) => handleClick(e)}>Settings</Link></li>
                    <li><Link to="#" name="favorites" onClick={(e) => handleClick(e)}>Favorite Peaks</Link></li>
                    <li><Link to="#" name="conquered" onClick={(e) => handleClick(e)}>Conquered Peaks</Link></li>
                    <li><Link to="#" name="journal" onClick={(e) => handleClick(e)}>My Journal</Link></li>
                    <li className={styles.line}>&nbsp;</li>
                    <li><a href="/logout" name="logout">Logout</a></li>
                </ul>
            </nav>
            {settings ? <ProfileSettings /> : ''}
        </div>
    )



}

export default withRouter(Profile);
