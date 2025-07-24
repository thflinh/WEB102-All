import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#ffb74d', '#ff8a65', '#81c784', '#64b5f6', '#ba68c8', '#f06292'];

function Dashboard({ breweries }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const totalCount = breweries.length;
  const countByType = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const nameLengths = breweries.map(b => b.name.length).sort((a,b) => a-b);
  const mid = Math.floor(nameLengths.length / 2);
  const medianNameLength = nameLengths.length ? nameLengths.length % 2 === 0 
                            ? (nameLengths[mid - 1] + nameLengths[mid]) / 2 : nameLengths[mid] : 0;

  const filteredBreweries = breweries
    .filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(b => (filterType ? b.brewery_type === filterType : true));

  // Prepare chart data
  const typeChartData = Object.entries(countByType).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  const stateData = breweries.reduce((acc, brewery) => {
    if (brewery.state) {
      acc[brewery.state] = (acc[brewery.state] || 0) + 1;
    }
    return acc;
  }, {});

  const topStates = Object.entries(stateData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([state, count]) => ({ state, count }));

  return (
    <div className="dashboard-content">
      <header className="header">
        <h1>Brewery Dashboard</h1>
        
        <div className="stats">
          <div className="stat-item">Total breweries: {totalCount}</div>
          <div className="stat-item">Micro: {countByType.micro || 0}</div>
          <div className="stat-item">Regional: {countByType.regional || 0}</div>
          <div className="stat-item">Brewpub: {countByType.brewpub || 0}</div>
          <div className="stat-item">Large: {countByType.large || 0}</div>
          <div className="stat-item">Median name length: {medianNameLength.toFixed(1)}</div>
        </div>

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

      {/* Data Insights Section */}
      <div className="insights-container">
        <h2 className="section-title">📊 Data Insights</h2>
        <p className="insight-text">
          This dataset contains {totalCount} breweries from across the United States. 
          The most common type is <strong>{Object.entries(countByType).sort(([,a], [,b]) => b - a)[0]?.[0] || 'micro'}</strong> breweries, 
          representing {Math.round((Object.entries(countByType).sort(([,a], [,b]) => b - a)[0]?.[1] || 0) / totalCount * 100)}% of all entries.
          Click on any brewery name to explore detailed information about that location.
        </p>
      </div>

      {/* Chart Visualizations */}
      <div className="chart-container">
        <h3 className="chart-title">🏭 Brewery Types Distribution</h3>
        <p className="chart-description">
          This chart shows the breakdown of different brewery types in our dataset. 
          Micro breweries dominate the craft beer landscape, focusing on small-batch, artisanal production.
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={typeChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d7ccc8" />
            <XAxis 
              dataKey="type" 
              stroke="#6d4c41"
              fontSize={12}
            />
            <YAxis stroke="#6d4c41" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fffde7', 
                border: '1px solid #d7ccc8',
                borderRadius: '4px'
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#ffb74d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">🗺️ Top 10 States by Brewery Count</h3>
        <p className="chart-description">
          Geographic distribution reveals brewing hotspots across America. 
          States like California, Colorado, and Oregon lead the craft beer revolution.
        </p>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={topStates}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({state, count}) => `${state}: ${count}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
            >
              {topStates.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fffde7', 
                border: '1px solid #d7ccc8',
                borderRadius: '4px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Brewery Table */}
      <div className="table-container">
        <h3 className="section-title">🍻 Brewery Directory ({filteredBreweries.length} results)</h3>
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
                <td>
                  <Link to={`/brewery/${brewery.id}`} className="brewery-link">
                    {brewery.name}
                  </Link>
                </td>
                <td>{brewery.brewery_type}</td>
                <td>{brewery.city}</td>
                <td>{brewery.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
  );
}

export default Dashboard;