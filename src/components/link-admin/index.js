import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const LinkAdmin = (props) => {
    return (
        <div className={styles.nav__el}>
            <div className={styles.dropdown}>
                <span>{props.title}</span>
                <div className={styles["dropdown-content"]}>
                    <Link className={styles.nav__sub} to="/create-article">Create Article</Link>
                    <Link className={styles.nav__sub} to="/modify">Modify Articles</Link>
                </div>
            </div>
        </div>
    )
}

export default LinkAdmin;