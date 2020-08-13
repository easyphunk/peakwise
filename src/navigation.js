import React, { useContext } from 'react';
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
import logoutPage from './components/logout';
import ModifyTripPage from './pages/modify-trip-page';

const Navigation = () => {
    const context = useContext(UserContext);
    const loggedIn = context.loggedIn;
    const admin = context.admin;

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact >
                    {loggedIn ? (<Redirect to='/explore' />) : (<HomePage />)}
                </Route>
                <Route path="/login">
                    {loggedIn ? (<Redirect to='/explore' />) : (<LoginPage />)}
                </Route>
                <Route path="/register">
                    {loggedIn ? (<Redirect to='/explore' />) : (<RegisterPage />)}
                </Route>
                <Route path="/create-article">
                    {admin ? (<CreateTripPage />) : (<Redirect to='/error' />)}
                </Route>
                <Route path="/explore" exact>
                    {loggedIn ? (<ExplorePage />) : (<Redirect to='/login' />)}
                </Route>
                <Route path="/profile/:userid">
                    {loggedIn ? (<ProfilePage />) : (<LoginPage />)}
                </Route>
                <Route path="/explore/:tripid">
                    {loggedIn ? (<TripDetailsPage />) : (<LoginPage />)}
                </Route>
                <Route path="/modify/">
                    {admin ? (<ModifyTripPage />) : (<Redirect to='/error' />)}
                </Route>
                <Route path="/edit/:tripid">
                    {admin ? (<TripEditPage />) : (<Redirect to='/error' />)}
                </Route>
                <Route path="/logout" component={logoutPage} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation;