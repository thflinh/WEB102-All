import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import BreweryDetail from './BreweryDetail';
import Sidebar from './Sidebar';
import './App.css';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBreweries() {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setBreweries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBreweries();
  }, []);

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">🍺 Loading breweries...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <div className="app-layout">
          <Sidebar breweries={breweries} />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard breweries={breweries} />} 
              />
              <Route 
                path="/brewery/:id" 
                element={<BreweryDetail />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;