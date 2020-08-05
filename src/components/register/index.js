import React, { Component } from 'react';
import styles from './index.module.css';
import Button from '../../components/button';
import Input from '../input';
import getInputFields from '../../utils/inputFields';
import onChange from '../../utils/inputChangeHandler';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            rePassword: ''
        }
    }

    render() {

        const credentialsFields = getInputFields(this.props).register;

        return (
            <div className={styles["register-form"]}>
                <h2 className={styles["heading-secondary"] + ' ' + styles["ma-bt-lg"]}>Create your account</h2>
                <form>
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
                    <Button title="Register" href="#" stylePref="regular" />
                </form>
            </div>
        )
    }
}

export default RegisterPage;