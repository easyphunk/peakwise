import React, { Component } from 'react';
import styles from './index.module.css';
import TripCard from '../trip-card';
import Button from '../button';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favorites: []
        }
    }

    getUser = async (id) => {
        const userPromise = await fetch(`http://localhost:9999/api/v1/users/${id}`);
        const user = await userPromise.json();

        this.setState({
            favorites: user.tripsLiked
        });
    }

    renderTrips = () => {
        return this.state.favorites.map(el => {
            return (
                <TripCard key={el._id} {...el} />
            )
        });
    }

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
    }

    render() {
        const { favorites } = this.state;

        if (!favorites) {
            return (
                <div></div>
            )
        }

        return (
            <div className={styles["user-view__content"]}>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>Your favorite peaks</h2>
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

export default withRouter(Profile);