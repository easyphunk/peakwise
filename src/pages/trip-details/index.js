import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../../components/button';

class TripDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {}
        }
    }

    getTrip = async () => {
        // TODO
        const tripPromise = await fetch('http://localhost:9999/api/v1/trips/5f281ba027d4981c8cf92bc4');
        const trip = await tripPromise.json();

        this.setState({
            trip
        });
    }

    componentDidMount() {
        this.getTrip();
    }

    render() {
        const { trip } = this.state;
        
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
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}>Elevation</span><span
                                    className={styles["overview-box__text"]}>{trip.elevation} m</span></div>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}>Elevation</span><span
                                    className={styles["overview-box__text"]}>{trip.elevationInFt} ft</span></div>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}>Latitude</span><span
                                    className={styles["overview-box__text"]}>{trip.latitude} &deg;</span></div>
                                <div className={styles["overview-box__detail"]}><span className={styles["overview-box__label"]}>Longitude</span><span
                                    className={styles["overview-box__text"]}>{trip.longitude} &deg;</span></div>
                            </div>
                            <div className={styles["overview-box__group"]}>
                                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>#PLACEHOLDER</h2>
                                <div className={styles["overview-box__detail"]}><img className={styles["overview-box__img"]}
                                    src="/placeholder-img.jpg" alt="#placeholder" /><span
                                        className={styles["overview-box__label"]}>#PLACEHOLDER</span><span className={styles["overview-box__text"]}>#PLACEHOLDER</span></div>
                                <div className={styles["overview-box__detail"]}><img className={styles["overview-box__img"]}
                                    src="/placeholder-img.jpg" alt="#placeholder" /><span
                                        className={styles["overview-box__label"]}>#PLACEHOLDER</span><span className={styles["overview-box__text"]}>#PLACEHOLDER</span></div>
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
                <section className={styles["section-info"]}>
                    <p className={styles["heading-secondary"]}>Getting there</p>
                    <p className={styles.info__text}>{trip.gettingThere}</p>
                </section>

                <section className={styles["section-pictures"]}>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.images ? trip.images[0] : null} alt={trip.name + ' 1'} /></div>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.images ? trip.images[1] : null} alt={trip.name + ' 2'} /></div>
                    <div className={styles["picture-box"]}><img className={styles["picture-box__img"] + ' ' + styles["picture-box__img"]}
                        src={trip.images ? trip.images[2] : null} alt={trip.name + ' 3'} /></div>
                </section>

                <section className={styles["section-wtc"]}>
                    <div className={styles.wtc}>
                        <div className={styles.wtc__img + ' ' + styles["wtc__img--logo"]}><img src="/logo-black.png"
                            alt="peakwise" /></div><img className={styles.wtc__img + ' ' + styles["wtc__img--1"]}
                                src={trip.images ? trip.images[1] : null} alt="trip" /><img
                                className={styles.wtc__img + ' ' + styles["wtc__img--2"]} src={trip.images ? trip.images[2] : null}
                            alt="trip" />
                        <div className={styles.wtc__content}>
                            <h2 className={styles["heading-secondary"]}>When to climb</h2>
                            <p className={styles.wtc__text}>{trip.whenToClimb}</p>
                            <Button title="Like" href="#" stylePref="regular" />
                            <Button title="Conquered !" href="#" stylePref="regular" />
                            <Button title="Edit" href="#" stylePref="regular" />
                        </div>
                    </div>
                </section>
                <section className={styles["section-reviews"]}>
                    <div className={styles.reviews}>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros
                        condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Pulvinar taciti etiam aenean lacinia natoque interdum fringilla suspendisse
                            nam
                        sapien urna!</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Sem feugiat sed lorem vel dignissim platea habitasse dolor suscipit
                            ultricies
                        dapibus</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Blandit varius nascetur est felis praesent lorem himenaeos pretium dapibus
                        tellus bibendum consequat ac duis</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Tempor pellentesque eu placerat auctor enim nam suscipit tincidunt natoque
                        ipsum est.</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                        <div className={styles.reviews__card}>
                            <div className={styles.reviews__avatar}><img className={styles["reviews__avatar-img"]}
                                src="/placeholder-img.jpg" alt="#placeholder" />
                                <h6 className={styles.reviews__user}>#PLACEHOLDER</h6>
                            </div>
                            <p className={styles.reviews__text}>Magna magnis tellus dui vivamus donec placerat vehicula erat turpis</p>
                            <div className={styles.reviews__rating}></div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
}

export default TripDetailsPage;
