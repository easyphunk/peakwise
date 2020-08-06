import React from 'react';

const UserContext = React.createContext({
    loggedIn: false,
    user: null,
    admin: false,
    logIn: () => {},
    logOut: () => {}
});

export default UserContext;