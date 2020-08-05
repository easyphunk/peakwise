import React from 'react';
import styles from './index.module.css';
import Header from '../../components/header';
import Error from '../../components/error';

function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Error />
    </div>
  );
}

export default ErrorPage;
