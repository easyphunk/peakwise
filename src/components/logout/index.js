import React, { Component } from 'react';
import UserContext from '../../UserContext';

class Logout extends Component {
    static contextType = UserContext;

    componentDidMount() {
        this.context.logOut();
        this.props.history.push('/')
    }

    render() {
        return (
            <p></p>
        )
    }

}

export default Logout;
