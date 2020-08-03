import React, { Component } from 'react';
import styles from './index.module.css';
import TripCard from '../../components/trip-card';

class TripListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: []
        }
    }

    getTrips = async () => {
        const tripsPromise = await fetch('http://localhost:9999/api/v1/trips');
        const trips = await tripsPromise.json();

        this.setState({
            trips: trips
        });
    }

    renderTrips() {
        const { trips } = this.state;

        return trips.map(el => {
            return (
                <TripCard key={el._id} {...el} />
            )
        });
    }

    componentDidMount() {
        this.getTrips();
    }

    render() {
        return (
            <section className={styles["card-container"]}>
                {this.renderTrips()}
            </section>
        );
    }
}

export default TripListPage;
