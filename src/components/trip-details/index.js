import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../../components/button';
import { withRouter } from 'react-router-dom';
import TripDetailsUser from '../trip-details-user';
import UserContext from '../../UserContext';
import TripMap from '../trip-map';

class TripDetails extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            trip: {},
            conquered: false,
            liked: false
        }
    }

    static contextType = UserContext;

    getTrip = async (id) => {
        const tripPromise = await fetch(`http://localhost:9999/api/v1/trips/${id}`);

        if (!tripPromise.ok) {
            this.props.history.push('/error');
        }

        const trip = await tripPromise.json();

        this.setState({
            trip
        });

        if (this.context.user.tripsCompleted) {
            if (this.context.user.tripsCompleted.includes(id)) {
                this.setState({
                    conquered: true
                });
            }
            if (this.context.user.tripsLiked.includes(id)) {
                this.setState({
                    liked: true
                });
            }
        }

    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.getTrip(this.props.match.params.tripid);
    }

    componentDidUpdate = async () => {
        fetch(`http://localhost:9999/api/v1/users/${this.context.user._id}`)
            .then(res => res.json())
            .then(json => this.context.user = json);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    tripManager = async (e, action) => {
        e.preventDefault();

        const result = await fetch(`http://localhost:9999/api/v1/trips/${this.props.match.params.tripid}?${action}=${this.context.user._id}`, {
            method: 'PATCH'
        });

        if (result.ok) {
            if (action === 'like' || action === 'unlike') {
                this.setState({
                    liked: !this.state.liked
                });
            } else if (action === 'conquer' || action === 'unconquer') {
                this.setState({
                    conquered: !this.state.conquered
                });
            }
        }
    }

    render() {
        const { trip } = this.state;

        if (Object.keys(trip).length === 0 && trip.constructor === Object) {
            return (
                <div></div>
            );
        }

        return (
            <section className={styles.wrapper}>
                <section className={styles["section-header"]}>
                    <div className={styles.header__hero}>
                        <div className={styles["header__hero-overlay"]}>&nbsp;</div><img className={styles["header__hero-img"]}
                            src={trip.coverImage} alt={trip.name} />
                    </div>
                    <div className={styles["heading-box"]}>
                        <h1 className={styles["heading-primary"]}><span>{trip.name}</span></h1>
                        <div className={styles["heading-box__group"]}>
                            <div className={styles["heading-box__detail"]}><span className={styles["heading-box__text"]}>{trip.elevation} m</span></div>
                            <div className={styles["heading-box__detail"]}><span className={styles["heading-box__text"]}>{trip.location}</span></div>
                        </div>
                    </div>
                </section>
                <section className={styles["section-description"]}>
                    <div className={styles["overview-box"]}>
                        <div>
                            <div className={styles["overview-box__group"]}>
                                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Quick facts</h2>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}><ion-icon className={styles.ion__icon} name="golf-outline"></ion-icon> Elevation:</span><span
                                    className={styles["overview-box__text"]}>{trip.elevation} m / {trip.elevationInFt} ft</span></div>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}><ion-icon className={styles.ion__icon} name="earth-outline"></ion-icon> Location:</span><span
                                    className={styles["overview-box__text"]}>{trip.location}</span></div>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}><ion-icon className={styles.ion__icon} name="compass-outline"></ion-icon> Latitude/Longitude:</span><span
                                    className={styles["overview-box__text"]}>{trip.latitude} &deg; / {trip.longitude} &deg;</span></div>
                            </div>
                            <div className={styles["overview-box__group"]}>
                                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>When to climb</h2>
                                <p className={styles.wtc__text}>{trip.whenToClimb}</p>
                                <p>&nbsp;</p>
                                <p>&nbsp;</p>
                                {this.state.liked ? <Button title="Unlike" stylePref="regular-disabled" onClick={(e) => this.tripManager(e, 'unlike')} /> : <Button title="Like" stylePref="regular" onClick={(e) => this.tripManager(e, 'like')} />}
                                {this.state.conquered ? <Button title="Conquered!" stylePref="regular-disabled" onClick={(e) => this.tripManager(e, 'unconquer')} /> : <Button title="Conquered?" stylePref="regular" onClick={(e) => this.tripManager(e, 'conquer')} />}
                            </div>
                        </div>
                    </div>
                    <div className={styles["description-box"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Climbing history</h2>
                        <p className={styles.description__text}>{trip.climbingHistory}</p>
                    </div>
                </section>
                <section className={styles["section-info"]}>
                    <p className={styles["heading-secondary"]}>Overview</p>
                    <p className={styles.info__text}>{trip.overview}</p>
                </section>
                <section className={styles["section-pictures"]}>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.image1 ? trip.image1 : null} alt={trip.name + ' 1'} /></div>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.image2 ? trip.image2 : null} alt={trip.name + ' 2'} /></div>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.image3 ? trip.image3 : null} alt={trip.name + ' 3'} /></div>
                </section>
                <section className={styles["section-info"]}>
                    <p className={styles["heading-secondary"]}>Getting there</p>
                    <p className={styles.info__text}>{trip.gettingThere}</p>
                </section>
                <section className={styles["section-map"]}>
                    <TripMap lng={trip.longitude} lat={trip.latitude} zoom={11} />
                </section>
                {
                    trip.completedBy.length === 0 ? '' :
                        <div>
                            <section className={styles["section-climbers"]}>
                                <p className={styles["heading-secondary"]}>Climbed by</p>
                            </section>
                            <section className={styles["section-conquerors"]}>
                                <div className={styles.conquerors}>
                                    {
                                        trip.completedBy.map(el => {
                                            return (
                                                <TripDetailsUser key={el._id} profilePhoto={el.profilePhoto} username={el.username} />
                                            )
                                        })
                                    }
                                </div>
                            </section>
                        </div>
                }
            </section>
        );
    }
}

export default withRouter(TripDetails);
