import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const LinkAdmin = (props) => {
    return (
        <Link className={styles.nav__el} to={props.href}>
            <div className={styles.dropdown}>
                <span>{props.title}</span>
                <div className={styles["dropdown-content"]}>
                    <Link className={styles.nav__sub} to="/create-article">Create Article</Link>
                    <Link className={styles.nav__sub} to="/create-article2">Modify Article</Link>
                </div>
            </div>
        </Link>
    )
}

export default LinkAdmin;