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
            loggedIn: null,
            user: null,
            admin: null
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
            admin: null
        })
    }

    componentDidMount() {
        const token = getCookie('x-auth-token');

        if(!token) {
            this.logOut();
            return;
        }

        fetch('http://localhost:9999/api/v1/users/verify', {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(promise => {
            console.log(promise);
            return promise.json();
        }).then(response => {
            if (response.status) {
                console.log(response);
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

        if (loggedIn === null) {
            return (
                <div>Loading...</div>
            )
        }

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