import React from 'react';
import './App.css';
import Header from './components/header';
import LandingPage from './pages/landing-page';
import TripListPage from './pages/trip-list';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <LandingPage /> */}
      <TripListPage />
    </div>
  );
}

export default App;
