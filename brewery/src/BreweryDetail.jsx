import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BreweryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBrewery() {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBrewery(data);
      } catch (error) {
        console.error('Error fetching brewery:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBrewery();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading brewery details...</div>;
  }

  if (error || !brewery) {
    return (
      <div>
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <div className="loading">
          {error ? `Error: ${error}` : 'Brewery not found'}
        </div>
      </div>
    );
  }

  return (
    <>
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </button>
      
      <div className="detail-card">
        <h1 className="detail-title">🍺 {brewery.name}</h1>
        
        <div className="detail-grid">
          <div className="detail-section">
            <h3 className="section-title">📍 Location Information</h3>
            
            <div className="detail-item">
              <strong>Type:</strong> {brewery.brewery_type || 'Not specified'}
            </div>
            
            <div className="detail-item">
              <strong>Address:</strong> {brewery.address_1 || 'Not available'}
              {brewery.address_2 && `, ${brewery.address_2}`}
            </div>
            
            <div className="detail-item">
              <strong>City:</strong> {brewery.city || 'Not specified'}
            </div>
            
            <div className="detail-item">
              <strong>State:</strong> {brewery.state || 'Not specified'}
            </div>
            
            <div className="detail-item">
              <strong>Postal Code:</strong> {brewery.postal_code || 'Not available'}
            </div>
            
            <div className="detail-item">
              <strong>Country:</strong> {brewery.country || 'Not specified'}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">📞 Contact Information</h3>
            
            {brewery.phone ? (
              <div className="detail-item">
                <strong>Phone:</strong> 
                <a href={`tel:${brewery.phone}`} className="contact-link">
                  {brewery.phone}
                </a>
              </div>
            ) : (
              <div className="detail-item">
                <strong>Phone:</strong> Not available
              </div>
            )}
            
            {brewery.website_url ? (
              <div className="detail-item">
                <strong>Website:</strong>
                <a 
                  href={brewery.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Visit Website
                </a>
              </div>
            ) : (
              <div className="detail-item">
                <strong>Website:</strong> Not available
              </div>
            )}
          </div>

          <div className="detail-section">
            <h3 className="section-title">🗺️ Additional Details</h3>
            
            {brewery.longitude && brewery.latitude ? (
              <div className="detail-item">
                <strong>Coordinates:</strong> {brewery.latitude}, {brewery.longitude}
                <br />
                <a 
                  href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  View on Google Maps
                </a>
              </div>
            ) : (
              <div className="detail-item">
                <strong>Coordinates:</strong> Not available
              </div>
            )}
            
            <div className="detail-item">
              <strong>Last Updated:</strong> {new Date(brewery.updated_at).toLocaleDateString()}
            </div>

            <div className="detail-item">
              <strong>Brewery ID:</strong> {brewery.id}
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="fun-facts-section">
          <h3 className="section-title">🍻 Fun Facts</h3>
          <div className="fun-fact">
            📏 Brewery name length: {brewery.name.length} characters
          </div>
          <div className="fun-fact">
            🏷️ Brewery type: {brewery.brewery_type ? brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1) : 'Unknown'} brewery
          </div>
          {brewery.state && (
            <div className="fun-fact">
              🗺️ Located in the great state of {brewery.state}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BreweryDetail;