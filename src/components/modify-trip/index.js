import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import Input from '../input';
import { withRouter } from 'react-router-dom';
import onChange from '../../utils/inputChangeHandler';
import TripCardModify from '../trip-card-modify';

class ModifyTripPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trips: [],
            searchedTrips: [],
            search: ''
        }
    }

    getTrips = async () => {
        const tripsPromise = await fetch('http://localhost:9999/api/v1/trips');

        if (!tripsPromise.ok) {
            this.props.history.push('/error');
        } else {
            const trips = await tripsPromise.json();
            this.setState({
                trips,
                searchedTrips: trips
            })
        }
    }

    renderTrips = () => {
        return this.state.searchedTrips.map(el => {
            return (
                <TripCardModify key={el._id} {...el} />
            )
        });
    }

    componentDidMount() {
        document.title = 'Peakwise: Modify Articles';
        this.getTrips();
    }

    searchTrips = async (e) => {
        e.preventDefault();
        const searchStr = new RegExp(this.state.search, 'i');
        const searchedTrips = this.state.trips.filter(el => searchStr.test(el.name))
        this.setState({
            searchedTrips
        })
    }

    clearSearch = (e) => {
        e.preventDefault();
        this.getTrips();
        this.setState({
            search: ''
        })
    }

    render() {
        const { trips, search } = this.state;

        if (!trips) {
            return (
                <div className={styles.loading}></div>
            )
        }

        return (
            <div className={styles.wrapper}>
                <h2 className={styles["heading-secondary"]}>Modify articles</h2>
                <div className={styles.search__section}>
                    <Input name="search" value={search} type="text" placeholder="Start typing..." onKeyDown={(e) => e.keyCode === 13 && this.searchTrips(e)} onChange={(e) => onChange(e, this)} />
                    <Button title="Search" href="#" stylePref="orange" onClick={(e) => this.searchTrips(e)} />
                    <Button title="Clear search" href="#" stylePref="wide" onClick={(e) => this.clearSearch(e)} />
                </div>
                <section className={styles.trip__list}>
                    {this.renderTrips()}
                </section>
            </div>
        );
    }
}

export default withRouter(ModifyTripPage);