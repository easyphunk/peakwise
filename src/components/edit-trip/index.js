import React, { Component } from 'react';
import Button from '../../components/button';
import styles from './index.module.css';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';

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

    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    componentDidMount() {
        this.getTrip();
    }

    render() {
        console.log(this.props);
        const tripFields = getInputFields(this.props).trip;

        return (
            <div className={styles["user-view"]}>
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Edit Peak Article</h2>
                        <form>
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
                                            keyPressHandler={field.type === 'Number' ? (e) => this.avoidEinNumberInput(e) : () => { }}
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

export default EditTripPage;