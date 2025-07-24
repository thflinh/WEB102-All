import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ breweries = [] }) {
  const location = useLocation();
  const isDetailView = location.pathname.includes('/brewery/');

  // Calculate sidebar statistics
  const totalCount = breweries.length;
  const countByType = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const stateCount = new Set(breweries.map(b => b.state)).size;
  const hasWebsite = breweries.filter(b => b.website_url).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🍺 Brewery Explorer</h2>
        {isDetailView && (
          <Link to="/" className="sidebar-home-link">
            ← Back to Dashboard
          </Link>
        )}
      </div>

      <div className="sidebar-section">
        <h3>📊 Quick Stats</h3>
        <div className="sidebar-stat">
          <span className="stat-label">Total Breweries:</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="sidebar-stat">
          <span className="stat-label">States Covered:</span>
          <span className="stat-value">{stateCount}</span>
        </div>
        <div className="sidebar-stat">
          <span className="stat-label">With Websites:</span>
          <span className="stat-value">{hasWebsite}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>🏭 Brewery Types</h3>
        {Object.entries(countByType)
          .sort(([,a], [,b]) => b - a)
          .map(([type, count]) => (
            <div key={type} className="sidebar-type">
              <span className="type-name">{type}</span>
              <span className="type-count">{count}</span>
            </div>
          ))}
      </div>

      <div className="sidebar-section">
        <h3>🔍 Navigation</h3>
        <div className="sidebar-nav">
          <Link 
            to="/" 
            className={`nav-link ${!isDetailView ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          {isDetailView && (
            <div className="nav-link active">
              🏢 Brewery Details
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>ℹ️ About Dataset</h3>
        <p className="sidebar-description">
          Data sourced from the Open Brewery DB, featuring craft breweries 
          across the United States. Updated regularly to reflect the 
          growing craft beer industry.
        </p>
      </div>

      <div className="sidebar-footer">
        <p>🍻 Cheers to craft beer! 🍻</p>
      </div>
    </aside>
  );
}

export default Sidebar;