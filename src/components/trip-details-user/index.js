import React from 'react';
import styles from './index.module.css';

const TripDetailsUser = (props) => {
    return (
        <div className={styles.reviews__card}>
            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                src={props.profilePhoto || '/profile-photo-default.png'} alt='user' />
            </div>
            <h6 className={styles.reviews__user}>{props.username}</h6>
        </div>
    )
}

export default TripDetailsUser;