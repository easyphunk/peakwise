import React from 'react';
import Header from '../header';
import Footer from '../footer';
import styles from './index.module.css';

const PageLayout = (props) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default PageLayout;