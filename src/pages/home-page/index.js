import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Landing from '../../components/landing';

function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Landing />
    </div>
  );
}

export default HomePage;
