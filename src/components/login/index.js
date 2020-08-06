import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';
import { withRouter } from 'react-router-dom';
import authService from '../../utils/authService';
import UserContext from '../../UserContext';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    static contextType = UserContext;

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        await authService('http://localhost:9999/api/v1/users/login',
            {
                username,
                password
            }, (user) => {
                // TODO
                this.context.logIn(user);
                this.props.history.push(`/explore`);

            }, () => {
                // TODO
                console.log('nah boi')
                this.props.history.push('/error');
            }
        );
    }

    render() {
        const credentialsFields = getInputFields().login;
        
        return (
            <div className={styles["login-form"]}>
                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Log into your account</h2>
                <form onSubmit={this.handleSubmit}>
                    {
                        credentialsFields.map(field => {
                            return (
                                <Input
                                    name={field.name}
                                    type={field.type}
                                    label={field.label}
                                    value={this.state[field.name]}
                                    placeholder={field.placeholder}
                                    require={field.required}
                                    onChange={(e) => onChange(e, this)}
                                    key={field.name}
                                />
                            )
                        })
                    }
                    <Button title="Login" href="#" stylePref="regular" toSubmit={true} onSumbit={(e) => this.handleSubmit(e)} />
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage);