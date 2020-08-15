import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import TripCard from '../../components/trip-card';
import Button from '../button';

const TripList = () => {
    const [trips, setTrips] = useState(null);
    const [sort, setSort] = useState({
        criteria: 'name',
        ascending: true
    });
    const history = useHistory();

    const renderTrips = () => {
        if (sort.criteria === 'name') {
            trips.sort((a, b) => sort.ascending ? (a.name).localeCompare(b.name) : (b.name).localeCompare(a.name));
        } else if (sort.criteria === 'elevation') {
            trips.sort((a, b) => sort.ascending ? a.elevation - b.elevation : b.elevation - a.elevation);
        } else if (sort.criteria === 'popularity') {
            trips.sort((a, b) => sort.ascending ? a.likes - b.likes : b.likes - a.likes);
        } else if (sort.criteria === 'conquered') {
            trips.sort((a, b) => sort.ascending ? a.completedBy.length - b.completedBy.length : b.completedBy.length - a.completedBy.length);
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

    const sortBy = (condition) => {
        setSort({
            criteria: condition,
            ascending: !sort.ascending
        })
    }

    useEffect(() => {
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
    <span className={styles.sort__label}>Sort By {sort.ascending ? <ion-icon name="chevron-down-outline"></ion-icon> : <ion-icon name="chevron-up-outline"></ion-icon>}</span>
                <Button title="Name" href="#" stylePref={sort.criteria === 'name' ? "orange" : "wide"} onClick={() => sortBy('name')} />
                <Button title="Elevation" href="#" stylePref={sort.criteria === 'elevation' ? "orange" : "wide"} onClick={() => sortBy('elevation')} />
                <Button title="Popularity" href="#" stylePref={sort.criteria === 'popularity' ? "orange" : "wide"} onClick={() => sortBy('popularity')} />
                <Button title="Climbs" href="#" stylePref={sort.criteria === 'conquered' ? "orange" : "wide"} onClick={() => sortBy('conquered')} />
            </section>
            <section className={styles.card__container}>
                {renderTrips()}
            </section>
        </>
    );
}

export default TripList;
