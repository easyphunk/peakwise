import React from 'react';
import Header from './components/header';
import LandingPage from './pages/landing-page';
import TripListPage from './pages/trip-list';
import Footer from './components/footer';
import TripDetailsPage from './pages/trip-details';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
  return (
    <div>
      <Header />
      {/* <LandingPage /> */}
      {/* <LoginPage /> */}
      <RegisterPage />
      {/* <TripListPage /> */}
      {/* <TripDetailsPage /> */}
      <Footer />
    </div>
  );
}

export default App;
