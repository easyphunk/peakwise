import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import SideNav from '../side-nav';
import { withRouter } from 'react-router-dom';
import PageLayout from '../page-layout';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    getUser = async (id) => {
        const userPromise = await fetch(`http://localhost:9999/api/v1/users/${id}`);
        
        if(!userPromise.ok) {
            this.props.history.push('/error');
        }
        
        const user = await userPromise.json();

        this.setState({
            user
        });
    }

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
    }

    render() {
        const { user } = this.state;

        return (
            <div className={styles["user-view"]}>
                <SideNav />
                <div className={styles["user-view__content"]}>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Your account settings</h2>
                        <form className={styles["form-user-data"]}>
                            <div className={styles.form__group}><p className={styles.form__label}>Username: {user.username}</p></div>
                            <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><p className={styles.form__label}>Email: {user.email}</p></div>
                            <Button title="#PLACEHOLDER" stylePref="orange" toSubmit={true} />
                            <div className={styles.form__group + ' ' + styles["form__photo-upload"]}>
                                <img className={styles["form__user-photo"]} src="/placeholder-img.jpg" alt="User" />
                                <p>#PLACEHOLDER PHOTO UPLOAD</p>
                            </div>
                            <Button title="#PLACEHOLDER" stylePref="orange" toSubmit={true} />
                            <div className={styles.form__group + ' ' + styles["form__photo-upload"]}></div>
                        </form>
                    </div>
                    <div className={styles.line}>&nbsp;</div>
                    <div className={styles["user-view__form-container"]}>
                        <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Other info</h2>
                        <form className={styles["form-user-password"]}>
                            <div className={styles["form__group"]}><p className={styles.form__label}>Likes: {user.tripsLiked ? user.tripsLiked.length : ''}</p></div>
                            <div className={styles["form__group"]}><p className={styles.form__label}>Conquered peaks: {user.tripsCompleted ? user.tripsCompleted.length : ''}</p></div>
                            <div className={styles["form__group"]}><p className={styles.form__label}>New password</p></div>
                            <Button title="#PLACEHOLDER" stylePref="orange" toSubmit={true} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);
