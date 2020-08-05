import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import ExplorePage from './pages/explore-page';
import CreateTripPage from './pages/create-trip-page';
import TripDetailsPage from './pages/trip-details-page';
import TripEditPage from './pages/trip-edit-page';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/create-article" component={CreateTripPage} />
                <Route path="/explore" exact component={ExplorePage} />
                {/* TODO
                <Route path="/profile/:userid" component={ProfilePage} /> */}
                <Route path="/explore/:tripid" component={TripDetailsPage} />
                <Route path="/edit/:tripid" component={TripEditPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation;