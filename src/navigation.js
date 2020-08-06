import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ExplorePage from './pages/explore-page';
import CreateTripPage from './pages/create-trip-page';
import TripDetailsPage from './pages/trip-details-page';
import TripEditPage from './pages/trip-edit-page';
import ProfilePage from './pages/profile-page';
import ErrorPage from './pages/error-page';
import UserContext from './UserContext';

class Navigation extends Component {
    static contextType = UserContext;

    render() {
        const {
            loggedIn,
            admin
        } = this.context;
        
        return (
            
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact >
                        {loggedIn ? <Redirect to='/explore' /> : <HomePage />}
                    </Route>
                    <Route path="/login" exact>
                        {loggedIn ? <Redirect to='/explore' /> : <LoginPage />}
                    </Route>
                    <Route path="/register">
                        {loggedIn ? <Redirect to='/explore' /> : <RegisterPage />}
                    </Route>
                    <Route path="/create-article" component={admin ? CreateTripPage : ErrorPage} />
                    <Route path="/explore" exact component={loggedIn ? ExplorePage : LoginPage} />
                    <Route path="/profile/:userid" component={loggedIn ? ProfilePage : LoginPage} />
                    <Route path="/explore/:tripid" component={loggedIn ? TripDetailsPage : LoginPage} />
                    <Route path="/edit/:tripid" component={admin ? TripEditPage : ErrorPage} />
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Navigation;