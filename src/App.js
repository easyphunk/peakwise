import React from 'react';
import Header from './components/header';
import LandingPage from './pages/landing-page';
import TripListPage from './pages/trip-list';
import Footer from './components/footer';
import TripDetailsPage from './pages/trip-details';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CreateTripPage from './pages/create-trip';
import EditTripPage from './pages/edit-trip';

function App() {
  return (
    <div>
      <Header />
      {/* <LandingPage /> */}
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
      <CreateTripPage />
      {/* <TripListPage /> */}
      <EditTripPage />
      {/* <TripDetailsPage /> */}
      <Footer />
    </div>
  );
}

export default App;
