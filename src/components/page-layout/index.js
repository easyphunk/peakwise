import React from 'react';
import Header from '../header';
import styles from './index.module.css';

const PageLayout = (props) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            {props.children}
        </div>
    )
}

export default PageLayout;