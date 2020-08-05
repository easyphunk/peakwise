import React, { Component } from 'react';
import Button from '../button';
import styles from './index.module.css';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';

class CreateTrip extends Component {
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

    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    render() {
        const tripFields = getInputFields(this.props).trip;

        return (
            <div className={styles["user-view"]}>
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Create Peak Article</h2>
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
                                            keyPressHandler={field.type === 'Number' ? (e) => this.avoidEinNumberInput(e) : () => {}}
                                        />
                                    )
                                })
                            }
                            <div className={styles.form__group + ' ' + styles.right}>
                                <Button title="Save changes" href="#" stylePref="regular" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTrip;