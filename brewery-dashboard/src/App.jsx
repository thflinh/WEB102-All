import React, { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBreweries() {
      try {
        console.log('Fetching breweries...');
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50')
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('Data length:', data.length);
        setBreweries(data);
      }
      catch (error) {
        console.error('Error fetching breweries:', error);
        setBreweries([]); // Set empty array on error
      }
      finally {
        setLoading(false);
      }
    }
    fetchBreweries();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const totalCount = breweries.length;

  const countByType = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  //median name length
  const nameLengths = breweries.map(b => b.name.length).sort((a,b) => a-b);
  const mid = Math.floor(nameLengths.length / 2);
  const medianNameLength = nameLengths.length ? nameLengths.length % 2 === 0 
                            ? (nameLengths[mid - 1] + nameLengths[mid]) / 2 :nameLengths[mid] : 0;

  const filteredBreweries = breweries.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                      .filter(b => (filterType ? b.brewery_type === filterType : true));
  
  if (loading) {
    return <div className="loading">Loading breweries...</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Brewery Dashboard</h1>

        <div className="stats">
          <div className="stat-item">Total breweries: {totalCount}</div>
          <div className="stat-item">
            Micro: {countByType.micro || 0}
          </div>

          <div className="stat-item">
            Regional: {countByType.regional || 0}
          </div>

          <div className="stat-item">
            Brewpub: {countByType.brewpub || 0}
          </div>

          <div className="stat-item">
            Median name length: {medianNameLength.toFixed(1)}
          </div>
        </div>

          {/*Controls: Search & Filter */}
          <div className="controls">
            <input
              type="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select 
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {Array.from(new Set(breweries.map(b => b.brewery_type))).map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
      </header>

      {/* Brewery List */}
      <table className="brewery-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>

        <tbody>
          {filteredBreweries.map(brewery => (
            <tr key={brewery.id}>
                <td>{brewery.name}</td>
                <td>{brewery.brewery_type}</td>
                <td>{brewery.city}</td>
                <td>{brewery.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <footer className="taproom-footer">
        <div className="taproom-banner">
          <h3>🍺 Welcome to Our Digital Taproom 🍺</h3>
          <p>Discover craft breweries from around the world • Est. 2025</p>
          <div className="footer-decorations">
            <span>🍻</span>
            <span>🌾</span>
            <span>🍺</span>
            <span>🌿</span>
            <span>🍻</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
