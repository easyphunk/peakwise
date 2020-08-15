import React from 'react';
import styles from './index.module.css';

const ErrorMessage = ({ that }) => {
    return (
        <div className={styles.error__msg}>{that.state.errorMsg !== '' ? that.state.errorMsg : ''}</div>
    )
}

export default ErrorMessage;