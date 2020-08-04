import React from 'react';
import Header from './components/header';
import LandingPage from './pages/landing-page';
import TripListPage from './pages/trip-list';
import Footer from './components/footer';
import TripDetailsPage from './pages/trip-details';

function App() {
  return (
    <div>
      <Header />
      {/* <LandingPage /> */}
      {/* <TripListPage /> */}
      <TripDetailsPage />
      <Footer />
    </div>
  );
}

export default App;
