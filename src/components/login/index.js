import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';
import { withRouter } from 'react-router-dom';
import authService from '../../utils/authService';
import UserContext from '../../UserContext';
import ErrorMessage from '../error-message';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        document.title = 'Peakwise: Login';
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        await authService(`${process.env.REACT_APP_API_URL}/api/v1/users/login`,
            {
                username,
                password
            }, (user) => {
                this.context.logIn(user);
                this.props.history.push(`/explore`);

            }, () => {
                this.setState({
                    errorMsg: 'Invalid login.'
                })
            }
        );
    }

    newLoginEntry = () => {
        this.setState({
            errorMsg: ''
        })
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
                                    onFocus={() => this.newLoginEntry()}
                                    key={field.name}
                                />
                            )
                        })
                    }
                    <ErrorMessage that={this} />
                    <p></p>
                    <Button title="Login" href="#" stylePref="regular" toSubmit={true} onSumbit={(e) => this.handleSubmit(e)} />
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage);