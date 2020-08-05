import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../button';
import Input from '../input';
import getInputFields from '../../utils/inputFields';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChange = (event) => {
        const targetName = event.target.name;
        const targetValue = event.target.value
        this.setState({
            [targetName]: targetValue
        });
    }

    avoidEinNumberInput = (event) => {
        return event.key === 'e' && event.preventDefault()
    }

    render() {
        const credentialsFields = getInputFields(this.props).login;

        return (
            <div className={styles["login-form"]}>
                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Log into your account</h2>
                <form className={styles.form}>
                    {
                        credentialsFields.map(field => {
                            return (
                                <Input
                                    name={field.name}
                                    type={field.type}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    require={field.required}
                                    keyPressHandler={(e) => this.avoidEinNumberInput(e)}
                                    onChange={(e) => this.onChange(e)}
                                    key={field.name}
                                />
                            )
                        })
                    }
                    <Button title="Login" href="#" stylePref="regular" />
                </form>
            </div>
        )
    }
}

export default LoginPage;