import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import TripCard from '../../components/trip-card';
import Button from '../button';

const TripList = () => {
    const [trips, setTrips] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('name');
    const [sortAscending, setSortAscending] = useState(true);
    const history = useHistory();

    const renderTrips = () => {
        if (sortCriteria === 'name') {
            trips.sort((a, b) => sortAscending ? (a.name).localeCompare(b.name) : (b.name).localeCompare(a.name));
        } else if (sortCriteria === 'elevation') {
            trips.sort((a, b) => sortAscending ? a.elevation - b.elevation : b.elevation - a.elevation);
        } else if (sortCriteria === 'popularity') {
            trips.sort((a, b) => sortAscending ? a.likes - b.likes : b.likes - a.likes);
        } else if (sortCriteria === 'conquered') {
            trips.sort((a, b) => sortAscending ? a.completedBy.length - b.completedBy.length : b.completedBy.length - a.completedBy.length);
        }
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

    const sortBy = (category) => {
        setSortCriteria(category);
    }

    useEffect(() => {
        document.title = 'Peakwise: Explore';
        getTrips();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!trips) {
        return (
            // TODO
            <div className={styles.loading}></div>
        )
    }

    return (
        <>
            <section className={styles.sort__section}>
                <span className={styles.sort__label} onClick={() => setSortAscending(!sortAscending)}>Sort by {sortAscending ? <ion-icon name="chevron-down-outline"></ion-icon> : <ion-icon name="chevron-up-outline"></ion-icon>}</span>
                <Button title="Name" href="#" stylePref={sortCriteria === 'name' ? "orange" : "wide"} onClick={() => sortBy('name')} />
                <Button title="Elevation" href="#" stylePref={sortCriteria === 'elevation' ? "orange" : "wide"} onClick={() => sortBy('elevation')} />
                <Button title="Popularity" href="#" stylePref={sortCriteria === 'popularity' ? "orange" : "wide"} onClick={() => sortBy('popularity')} />
                <Button title="Climbs" href="#" stylePref={sortCriteria === 'conquered' ? "orange" : "wide"} onClick={() => sortBy('conquered')} />
            </section>
            <section className={styles.card__container}>
                {renderTrips()}
            </section>
        </>
    );
}

export default TripList;
