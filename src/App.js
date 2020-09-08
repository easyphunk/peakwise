import React, { Component } from 'react';
import UserContext from './UserContext';

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: null,
            admin: false
        }
    }

    logIn = (user) => {
        this.setState({
            loggedIn: true,
            user,
            admin: user.userAccess === 'admin' ? true : false
        })
    }

    logOut = () => {
        document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        this.setState({
            loggedIn: false,
            user: null,
            admin: false
        })
    }

    componentDidMount() {
        const token = getCookie('x-auth-token');

        if(!token) {
            this.logOut();
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/verify`, {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(promise => {
            return promise.json();
        }).then(response => {
            if (response.status) {
                this.logIn(response.user);
            } else {
                this.logOut();
            }
        })
    }

    render() {
        const {
            loggedIn,
            user,
            admin
        } = this.state;

        return (
            <UserContext.Provider value={{
                loggedIn,
                user,
                admin,
                logIn: this.logIn,
                logOut: this.logOut
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default App;