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
            photoChangeFail: '',
            currPassword: '',
            newPassword: '',
            newRePassword: '',
            errCurrPass: '',
            errRepeatPass: '',
            successMsg: '',
            failMsg: ''
        }
    }

    getUser = async (id) => {
        const userPromise = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`);
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
                cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
                uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESET
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
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.match.params.userid}`, {
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
        } catch (err) {

        }
    }

    newPassEntry = () => {
        this.setState({
            errCurrPass: '',
            errRepeatPass: ''
        })
    }

    changePassword = async (e) => {
        e.preventDefault();
        if (this.state.currPassword === '') {
            this.setState({
                errCurrPass: 'Please enter your current password.',
                successMsg: '',
                failMsg: ''
            })
        } else {
            if (this.state.newPassword !== this.state.newRePassword) {
                this.setState({
                    errRepeatPass: 'Your new password & confirmation password do not match.',
                    successMsg: '',
                    failMsg: ''
                })
            } else {
                try {
                    const promise = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${this.props.match.params.userid}`, {
                        method: `PATCH`,
                        body: JSON.stringify({
                            currPassword: this.state.currPassword,
                            password: this.state.newRePassword
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const result = await promise.json();
                    if (result.status === 'success') {

                        this.setState({
                            successMsg: 'Password successfully changed.',
                            failMsg: '',
                            currPassword: '',
                            newPassword: '',
                            newRePassword: ''
                        })
                    } else {
                        throw new Error('Fail');
                    }
                } catch (err) {
                    this.setState({
                        failMsg: 'Password change failed.',
                        successMsg: ''
                    })
                }
            }
        }
    }

    render() {
        const { user, currPassword, newPassword, newRePassword } = this.state;

        return (
            <div className={styles["user-view__content"]}>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>Your account settings</h2>
                    <div className={styles["form-user-data"]}>
                        <div className={styles.form__group}>
                            <div className={styles.user__info}>{user.username}</div>
                        </div>
                        <div className={styles.form__group}>
                            <div className={styles.user__info}>{user.email}</div>
                        </div>
                        <div>&nbsp;</div>
                        <div className={styles.form__group + ' ' + styles["form__photo-upload"]}>
                            <img className={styles["form__user-photo"]} src={this.state.profilePhoto} alt="User" />
                        </div>
                        <div className={styles.form__group}>
                            <Button title="Change photo" toSubmit={true} onClick={() => this.openWidget()} stylePref="orange" />
                            <Button title="Save" stylePref={!this.state.photoChanged ? "disabled" : "orange"} toSubmit={true} onClick={(e) => this.savePhoto(e)} disabled={!this.state.photoChanged} />
                        </div>
                    </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"]}>Password change</h2>
                    <form className={styles["form-user-password"]}>
                        <div className={styles.form__group}>
                            <Input name="currPassword" value={currPassword} type="password" label="Current password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} onKeyDown={() => this.newPassEntry()} />
                        </div>
                        <div className={styles.form__group}>
                            <Input name="newPassword" value={newPassword} type="password" label="New password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} />
                        </div>
                        <div className={styles.form__group}>
                            <Input name="newRePassword" value={newRePassword} type="password" label="Confirm new password" placeholder="••••••••" required={true} onChange={(e) => onChange(e, this)} onKeyDown={() => this.newPassEntry()} />
                        </div>
                        <div className={styles.form__group}>
                            <div className={styles.error__msg}>{this.state.errCurrPass !== '' ? this.state.errCurrPass : ''}</div>
                            <div className={styles.error__msg}>{this.state.errRepeatPass !== '' ? this.state.errRepeatPass : ''}</div>
                            <div className={styles.success__msg}>{this.state.successMsg !== '' ? this.state.successMsg : ''}</div>
                            <div className={styles.fail__msg}>{this.state.failMsg !== '' ? this.state.failMsg : ''}</div>
                            <div></div>
                            <Button title="Save Password" stylePref={(this.state.newPassword === '' || this.state.newRePassword === '') ? "disabled" : "orange"} toSubmit={true} onClick={(e) => this.changePassword(e)} disabled={(this.state.newPassword === '' || this.state.newRePassword === '')} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);