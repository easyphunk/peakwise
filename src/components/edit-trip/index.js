import React, { Component } from 'react';
import Button from '../../components/button';
import styles from './index.module.css';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';
import { withRouter } from 'react-router-dom';
import tripService from '../../utils/tripService';

class EditTripPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            latitude: '',
            longitude: '',
            elevation: '',
            coverImage: '',
            image1: '',
            image2: '',
            image3: '',
            overview: '',
            climbingHistory: '',
            whenToClimb: '',
            gettingThere: ''
        }
    }

    getTrip = async (id) => {
        const tripPromise = await fetch(`http://localhost:9999/api/v1/trips/${id}`);

        if (!tripPromise.ok) {
            this.props.history.push('/error');
        }

        const trip = await tripPromise.json();

        this.setState({
            ...trip
        });
    }

    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    componentDidMount() {
        this.getTrip(this.props.match.params.tripid);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const updatedTripObj = this.state;

        await tripService(`http://localhost:9999/api/v1/trips/${this.props.match.params.tripid}`, { ...updatedTripObj }, 'PATCH',
            (tripId) => {
                this.props.history.push(`/explore/${tripId}`);
            }, () => {
                // TODO
                console.log('ERROR >>>> <<<<');
            }
        )
    }

    render() {
        const tripFields = getInputFields().trip;

        return (
            <div className={styles["user-view"]}>
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Edit Peak Article</h2>
                        <form onSubmit={this.handleSubmit}>
                            {
                                tripFields.map(field => {
                                    return (
                                        <Input
                                            name={field.name}
                                            type={field.type}
                                            label={field.label}
                                            step={field.step}
                                            value={this.state[field.name]}
                                            placeholder={field.placeholder}
                                            require={field.required}
                                            onChange={(e) => onChange(e, this)}
                                            key={field.name}
                                            onKeyDown={field.type === 'Number' ? (e) => this.avoidEinNumberInput(e) : () => { }}
                                        />
                                    )
                                })
                            }
                            <div className={styles.form__group + ' ' + styles.right}>
                                <Button title="Save changes" href="#" stylePref="regular" toSubmit={true} />
                            </div>
                        </form>
                    </div>
                    <div className={styles.line}>&nbsp;</div>
                </div>
            </div>
        )
    }
}

export default withRouter(EditTripPage);