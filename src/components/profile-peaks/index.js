import React, { Component } from 'react';
import styles from './index.module.css';
import TripCard from '../trip-card';
import { withRouter } from 'react-router-dom';

class ProfilePeaks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tripList: []
        }
    }

    getUser = async (id) => {
        const userPromise = await fetch(`http://localhost:9999/api/v1/users/detailed/${id}`);
        const user = await userPromise.json();

        this.setState({
            tripList: user[`trips${this.props.select === 'Liked' ? 'Liked' : 'Completed'}`]
        });
    }

    renderTrips = () => {
        return this.state.tripList.map(el => {
            return (
                <TripCard key={el._id} {...el} />
            )
        });
    }

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
    }

    render() {
        const { tripList } = this.state;

        if (tripList.length === 0) {
            return (
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"]}>{this.props.select === 'Liked' ? 'No favorite peaks' : 'No conquered peaks'}</h2>
                    </div>
                </div>
            )
        }

        return (
            <div className={styles["user-view__content"]}>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>{this.props.select === 'Liked' ? 'Your favorite peaks' : 'Your conquered peaks'}</h2>
                    <div className={styles["form-user-data"]}>
                        <div className={styles.form__group}>
                            <div className={styles.card__list}>
                                {this.renderTrips()}
                            </div>
                        </div>
                        <div>&nbsp;</div>
                    </div>
                </div>
                <div>&nbsp;</div>
            </div>
        );
    }
}

export default withRouter(ProfilePeaks);