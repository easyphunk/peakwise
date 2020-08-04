import React, { Component } from 'react';
import Button from '../../components/button';
import styles from './index.module.css';

class CreateTripPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            latitude: '',
            longitude: '',
            elevation: '',
            coverImage: '',
            images: '',
            overview: '',
            climbingHistory: '',
            whenToClimb: '',
            gettingThere: ''
        }
    }

    getTrip = async () => {
        // TODO
        const tripPromise = await fetch('http://localhost:9999/api/v1/trips/5f281ba027d4981c8cf92bc4');
        const trip = await tripPromise.json();

        this.setState({
            ...trip
        });
    }

    changeHandler = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value
        this.setState({
            [targetName]: targetValue
        });
    }

    // TODO - extract to a separate utility
    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    componentDidMount() {
        this.getTrip();
    }
    render() {
        return (
            <div className={styles["user-view"]}>
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Peak Details</h2>
                        <form className={styles.form + ' ' + styles["form-user-data"]}>
                            <div className={styles.form__group}><label className={styles.form__label} htmlFor="name">Name</label>
                                <input className={styles.form__input} id="name" type="text" value={this.state.name} required="" name="name" placeholder="e.g. Mount Everest" onChange={this.changeHandler} />
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="location">Location</label>
                                <input className={styles.form__input} id="location" value={this.state.location} required="" name="location" placeholder="e.g. Tibet/Khumbu, China/Nepal, Asia" onChange={this.changeHandler} />
                            </div>
                            <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Coordinates</h2>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="latitude">Latitude</label>
                                <input className={styles.form__input} id="latitude" type="number" step="0.001" onKeyDown={this.avoidEinNumberInput} value={this.state.latitude} required="" name="latitude" placeholder="e.g. 27.981" onChange={this.changeHandler} />
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="longitude">Longitude</label>
                                <input className={styles.form__input} id="longitude" type="number" step="0.001" onKeyDown={this.avoidEinNumberInput} value={this.state.longitude} required="" name="longitude" placeholder="e.g. 86.925" onChange={this.changeHandler} />
                            </div>
                            <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Main info</h2>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="elevation">Elevation in metres</label>
                                <input className={styles.form__input} id="elevation" type="number" step="1" onKeyDown={this.avoidEinNumberInput} value={this.state.elevation} required="" name="elevation" placeholder="e.g. 8848" onChange={this.changeHandler} />
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="coverImage">Cover Image</label>
                                <input className={styles.form__input} id="coverImage" value={this.state.coverImage} required="" name="coverImage" placeholder="e.g. https://res.cloudinary.com/dghpuejpt/image/upload/v1596306573/img/Mount-Everest_thdhtv.jpg" onChange={this.changeHandler} />
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="images">3 image links, separated by commas</label>
                                <input className={styles.form__input} id="images" value={this.state.images} required="" name="images" placeholder="e.g. https://img.com/img1.jpg, https://img.com/img2.jpg, https://img.com/img3.jpg" onChange={this.changeHandler} />
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="overview">Overview</label>
                                <textarea className={styles.text__input} id="overview" value={this.state.overview} required="" name="overview" placeholder="e.g. Mount Everest gets its European name from British Superintentant General of the Survey of India 1830-1843, Sir George Everest..." onChange={this.changeHandler} ></textarea>
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="climbingHistory">Climbing History</label>
                                <textarea className={styles.text__input} id="climbingHistory" value={this.state.climbingHistory} required="" name="climbingHistory" placeholder="e.g. In 1920 Sir Francis Younghusband received permission for an expedition to Everest from the Dalai Lama. This first team was headed by Charles Kenneth Howard-Bury..." onChange={this.changeHandler} ></textarea>
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="whenToClimb">When to climb</label>
                                <textarea className={styles.text__input} id="whenToClimb" value={this.state.whenToClimb} required="" name="whenToClimb" placeholder="e.g. From April to May, even mid-June, is arguably the ideal time to Mount Everest; not only is the peak often visible and clear..." onChange={this.changeHandler} ></textarea>
                            </div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><label className={styles.form__label} htmlFor="gettingThere">Getting There</label>
                                <textarea className={styles.text__input} id="gettingThere" value={this.state.gettingThere} required="" name="gettingThere" placeholder="e.g. Starting from Lhasa, take a bus (10 hours) or train (3 hours) to Shigatse, then private transport to the base camp (12 hours) via Dingri and Rongbuk Monastery (the highest religious building in the world)...." onChange={this.changeHandler} ></textarea>
                            </div>
                            <div className={styles.form__group + ' ' + styles.right}>
                                <Button title="Save changes" href="#" stylePref="regular" />
                            </div>
                        </form>
                    </div>
                    <div className={styles.line}>&nbsp;</div>
                </div>
            </div>
        )
    }
}

export default CreateTripPage;