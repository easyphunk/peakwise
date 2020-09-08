import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../../components/button';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';
import { withRouter } from 'react-router-dom';
import authService from '../../utils/authService';
import UserContext from '../../UserContext';
import ErrorMessage from '../error-message';
import { serializeError } from 'serialize-error';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            rePassword: '',
            errorMsg: ''
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        document.title = 'Peakwise: Register';
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, rePassword } = this.state;

        if (username === '' || email === '' || password === '' || rePassword === '') {
            this.setState({
                errorMsg: 'Please fill all details.'
            })
            return;
        } else if (password !== rePassword) {
            this.setState({
                errorMsg: 'Passwords do not match.'
            })
            return;
        }

        await authService(`${process.env.REACT_APP_API_URL}/api/v1/users/register`,
            {
                username,
                email,
                password,
                rePassword
            }, (user) => {
                this.context.logIn(user);
                this.props.history.push('/explore');
            }, (err) => {
                const serializedErr = serializeError(err).message;
                const errMsg = JSON.parse(serializedErr).message;
                if (errMsg.includes('User validation failed: email')) {
                    this.setState({
                        errorMsg: 'Please write a valid email address.'
                    })
                } else if (errMsg.includes('index: username')) {
                    this.setState({
                        errorMsg: 'This username is already in use.'
                    })
                } else if (errMsg.includes('index: email')) {
                    this.setState({
                        errorMsg: 'This email is already in use.'
                    })
                }
            }
        );
    }

    render() {

        const credentialsFields = getInputFields().register;

        return (
            <div className={styles["register-form"]}>
                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Create your account</h2>
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
                    <ErrorMessage that={this} />
                    <p></p>
                    <Button title="Register" href="#" stylePref="regular" toSubmit={true} />
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterPage);