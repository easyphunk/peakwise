import React from 'react';
import styles from './index.module.css';
import Button from '../button';

const TripCard = (props) => {
    return (
        <div className={styles.card}>
        <div className={styles.card__header}>
            <div className={styles.card__picture}>
                <div className={styles["card__picture-overlay"]}>&nbsp;</div><img className={styles["card__picture-img"]}
                    src={props.coverImage} alt={props.name} />
            </div>
            <h3 className={styles["heading-tertirary"]}><span>{props.name}</span></h3>
        </div>
        <div className={styles.card__details}>
            <h4 className={styles["card__sub-heading"]}>{props.location}</h4>
            <p className={styles.card__text}>{`${props.overview.slice(0, 155)}...`}</p>
            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="golf-outline"></ion-icon> {props.elevation} m</span></div>
            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="compass-outline"></ion-icon> Lat: {props.latitude} &deg;</span></div>
            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="golf-outline"></ion-icon> {props.elevationInFt} ft</span></div>
            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="compass-outline"></ion-icon> Lon: {props.longitude} &deg;</span></div>
        </div>
        <div className={styles.card__footer}>
            <p><span className={styles["card__footer-value"]}>{props.completedBy.length}</span> <span className={styles["card__footer-text"]}>{props.completedBy.length === 1 ? 'has conquered this peak' : 'have conquered this peak' }</span>
            </p>
            <p className={styles.card__likes}><span className={styles["card__footer-value"]}>{props.likes}</span> <span
                className={styles["card__footer-text"]}>likes</span></p>
                <Button title="Details" href={`/explore/${props._id}`} stylePref="regular" />
        </div>
    </div>
    )
}

export default TripCard;