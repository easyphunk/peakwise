import React, { Component } from 'react';
import Button from '../../components/button';
import styles from './index.module.css';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';
import { withRouter } from 'react-router-dom';
import tripService from '../../utils/tripService';
import TripMap from '../trip-map';
import ButtonImageUpload from '../button-img-upload';


class EditTripPage extends Component {
    _isMounted = false;
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
            gettingThere: '',
            errorMsg: ''
        }
    }

    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const newTripObj = this.state;

        await tripService('http://localhost:9999/api/v1/trips', { ...newTripObj }, 'POST',
            (tripId) => {
                this.props.history.push(`/explore/${tripId}`);
            }, () => {
                this.setState({
                    errorMsg: 'Please make sure all details are filled.'
                })
            }
        )
    }
        
    render() {
        const tripFields = getInputFields().trip;

        return (
            <div className={styles["user-view"]}>
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Create Peak Article</h2>
                        <form onSubmit={this.handleSubmit}>
                            {
                                <div>
                                    <section className={styles.form__group__photos}>
                                        <ButtonImageUpload title="Choose cover" targetImg="coverImage" that={this} />
                                        <ButtonImageUpload title="Choose thumbnail 1" targetImg="image1" that={this} />
                                        <ButtonImageUpload title="Choose thumbnail 2" targetImg="image2" that={this} />
                                        <ButtonImageUpload title="Choose thumbnail 3" targetImg="image3" that={this} />
                                    </section>
                                    {tripFields.map(field => {
                                        if (field.name === 'latitude') {
                                            return (
                                                <div key={field.name} className={styles.section__map}>
                                                    <img src='/pointer.png' alt="pointer"></img>
                                                    <TripMap lat={27.981} lng={86.925} zoom={11} pin={false} />
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
                                                </div>
                                            )
                                        } else {
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
                                        }
                                    })}
                                </div>
                            }
                            <div className={styles.error__msg}>{this.state.errorMsg !== '' ? this.state.errorMsg : ''}</div>
                            <div className={styles.form__group}>
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