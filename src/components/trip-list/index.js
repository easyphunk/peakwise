import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import TripCard from '../../components/trip-card';

const TripList = () => {
    const [trips, setTrips] = useState(null);
    const history = useHistory();

    const renderTrips = () => {
        return trips.map(el => {
            return (
                <TripCard key={el._id} {...el} />
            )
        });
    }

    const getTrips = async () => {
        const tripsPromise = await fetch('http://localhost:9999/api/v1/trips');

        if (!tripsPromise.ok) {
            history.push('/error');
        } else {
            const trips = await tripsPromise.json();
            setTrips(trips);
        }
    }

    useEffect(() => {
        getTrips();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!trips) {
        return (
            // TODO
            <div>Loading...</div>
        )
    }

    return (
        <section className={styles["card-container"]}>
            {renderTrips()}
        </section>
    );
}

export default TripList;
