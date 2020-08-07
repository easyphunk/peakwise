import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Button from '../button';
import SideNav from '../side-nav';
import { withRouter } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const params = useParams();
    const history = useHistory();

    const getUser = async () => {
        const id = params.userid;
        const userPromise = await fetch(`http://localhost:9999/api/v1/users/${id}`);
        
        if (!userPromise.ok) {
            history.push('/error');
        } else {    
            const user = await userPromise.json();
            
            setUsername(user.username);
            setEmail(user.email && user.email);
            setProfilePhoto(user.profilePhoto && user.profilePhoto)
        }
    }
    
    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!username) {
        return (
            // TODO
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles["user-view"]}>
            <SideNav />
            <div className={styles["user-view__content"]}>
                <div className={styles["user-view__form-container"]}>
                    <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-md"]}>Your account settings</h2>
                    <div className={styles["form-user-data"]}>
                        <div className={styles.form__group}><p className={styles.form__label}>Username: {username}</p></div>
                        <div className={styles.form__group + ' ' + styles["ma-bt-md"]}><p className={styles.form__label}>Email: {email}</p></div>
                        <Button title="Logout" stylePref="orange" href="/logout"/>
                        <div className={styles.form__group + ' ' + styles["form__photo-upload"]}>
                            <img className={styles["form__user-photo"]} src={profilePhoto} alt="User" />
                            <p>#PLACEHOLDER PHOTO UPLOAD</p>
                        </div>
                        <Button title="#PLACEHOLDER" stylePref="orange" toSubmit={true} />
                        <div className={styles.form__group + ' ' + styles["form__photo-upload"]}></div>
                    </div>
                </div>
                <div className={styles.line}>&nbsp;</div>
            </div>
        </div>
    )



}

export default withRouter(Profile);
