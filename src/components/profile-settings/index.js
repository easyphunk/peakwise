import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import Input from '../input';
import { withRouter } from 'react-router-dom';
import onChange from '../../utils/inputChangeHandler';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            profilePhoto: '',
            photoChanged: false,
            currPassword: '',
            passChanged: false,
            newPassword: '',
            newRePassword: ''
        }
    }

    getUser = async (id) => {
        const userPromise = await fetch(`http://localhost:9999/api/v1/users/${id}`);
        const user = await userPromise.json();

        this.setState({
            user: user,
            profilePhoto: user.profilePhoto
        });
    }

    componentDidMount() {
        this.getUser(this.props.match.params.userid);
    }

    openWidget = () => {
        let widget = window.cloudinary.createUploadWidget(
            {
                cloudName: 'dghpuejpt',
                uploadPreset: 'fiwhg3t9',
            },
            (error, result) => {
                if (result.event === 'success') {
                    const newImgUrl = result.info.url;
                    this.setState({
                        profilePhoto: newImgUrl,
                        photoChanged: true
                    })
                    console.log(this.state.profilePhoto);
                }
            },
        );
        widget.open()
    };

    savePhoto = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:9999/api/v1/users/${this.props.match.params.userid}`, {
            method: `PATCH`,
            body: JSON.stringify({
                profilePhoto: this.state.profilePhoto
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setState({
            photoChanged: false
        })
    }

    changePassword = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:9999/api/v1/users/${this.props.match.params.userid}`, {
            method: `PATCH`,
            body: JSON.stringify({
                profilePhoto: this.state.profilePhoto
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.setState({
            photoChanged: false
        })
    }

    render() {
        const { user, currPassword, newPassword, newRePassword } = this.state;

        return (
            <div className={styles["user-view__content"]}>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>Your account settings</h2>
                    <div className={styles["form-user-data"]}>
                        <div className={styles.form__group}>
                            <Input name="username" label="Username" value={user.username} />
                        </div>
                        <div className={styles.form__group}>
                            <Input name="email" label="Email" value={user.email} />
                        </div>
                        <div>&nbsp;</div>
                        <div className={styles.form__group + ' ' + styles["form__photo-upload"]}>
                            <img className={styles["form__user-photo"]} src={this.state.profilePhoto} alt="User" />
                        </div>
                        <div className={styles.form__group}>
                            <Button title="Change photo" toSubmit={true} onClick={() => this.openWidget()} stylePref="orange" />
                            <Button title="Save" stylePref="orange" toSubmit={true} onClick={(e) => this.savePhoto(e)} disabled={!this.state.photoChanged} />
                        </div>
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>Password change</h2>
                    <form className={styles["form-user-password"]}>
                        <div className={styles.form__group}>
                            <Input name="currPassword" value={currPassword} type="password" label="Current password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} />
                        </div>
                        <div className={styles.form__group}>
                            <Input name="newPassword" value={newPassword} type="password" label="New password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} />
                        </div>
                        <div className={styles.form__group}>
                            <Input name="newRePassword" value={newRePassword} type="password" label="Repeat new password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} />
                        </div>
                        <div className={styles.form__group}>
                            <Button title="Save Password" stylePref="orange" toSubmit={true} disabled={!this.state.passChanged} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);