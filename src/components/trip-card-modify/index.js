import React, { useState } from 'react';
import styles from './index.module.css';
import Button from '../button';

const TripCardModify = (props) => {
    const [error, setError] = useState('');
    const [confirmDialogue, setConfirmDialogue] = useState(true);
    const [deleted, setDelete] = useState(false);

    const deleteTrip = async (e) => {
        e.preventDefault();
        setDelete(true);
        const result = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/trips/${props._id}`, {
            method: 'DELETE'
        })
        if (!result.ok) {
            setError('Something went wrong.');
        }
    }

    const confirmDelete = (e) => {
        e.preventDefault();
        setConfirmDialogue(!confirmDialogue);
    }

    return (
        <>
            {
                deleted ?
                    <div className={styles.card}>
                        <div className={styles.card__details}>
                            <h3 className={styles.card__main}>Deleted</h3>
                        </div>
                    </div>
                    :
                    <div className={styles.card}>
                        <div className={styles.card__details}>
                            <h3 className={styles.card__main}><span>{props.name}</span></h3>
                            <h4 className={styles.card__main}>{props.location}</h4>
                            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="golf-outline"></ion-icon> {props.elevation} m</span></div>
                            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="compass-outline"></ion-icon> Lat: {props.latitude} &deg;</span></div>
                            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="golf-outline"></ion-icon> {props.elevationInFt} ft</span></div>
                            <div className={styles.card__data}><span><ion-icon className={styles.ion__icon} name="compass-outline"></ion-icon> Lon: {props.longitude} &deg;</span></div>
                        </div>
                        <div className={styles.card__footer}>

                            {confirmDialogue ?
                                <div>
                                    <Button title="Details" href={`/explore/${props._id}`} stylePref="admin" />
                                    <Button title="Edit" href={`/edit/${props._id}`} stylePref="admin" />
                                    <Button title="Delete" href={`/explore/${props._id}`} stylePref="admin" onClick={(e) => confirmDelete(e)} />
                                </div>
                                :
                                <div>
                                    <Button title="Yes" href={`/explore/${props._id}`} stylePref="admin" onClick={(e) => deleteTrip(e)} />
                                    <Button title="No" href={`/edit/${props._id}`} stylePref="admin" onClick={(e) => confirmDelete(e)} />
                                </div>
                            }
                            {
                                error !== '' ? <div className={styles.error__msg}>{error}</div> : ''
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default TripCardModify;