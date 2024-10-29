import React, { useRef, useEffect, useState } from 'react';
import { Col, Form } from 'reactstrap';
import './search-bar.css';

const SearchBar = () => {
  const locationRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current, {
        types: ["(cities)"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
          searchHandler(place.name);
        }
      });
    }
  }, []);

  const searchHandler = async (location = locationRef.current.value) => {
    if (location === '') {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        query: `popular places in ${location}`,
        fields: ["name", "geometry", "photos", "place_id", "rating", "formatted_address"],
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);
        } else {
          setError('No results found. Please try another location.');
        }
        setLoading(false);
      });
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <Col lg="12">
        <div className="search-bar">
          <Form 
            className="search-form"
            onSubmit={(e) => {
              e.preventDefault();
              searchHandler();
            }}
          >
            <span className="location-icon">
              <i className="ri-map-pin-fill"></i>
            </span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Explore places"
                ref={locationRef}
                id="searchInput"
                className="search-input"
              />
            </div>
            <button 
              type="button"
              className="search-button"
              onClick={() => searchHandler()}
              aria-label="Search"
            >
              <i className="ri-search-line"></i>
            </button>
          </Form>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}

        <div className="places-list">
          {places.map((place, index) => (
            <React.Fragment key={place.place_id}>
              <div className="place-card">
                <div className="place-image">
                  <img
                    src={place.photos ? place.photos[0].getUrl() : "/placeholder-image.jpg"}
                    alt={place.name}
                  />
                </div>
                <div className="place-info">
                  <div className="place-header">
                    <h3>{place.name}</h3>
                    {place.rating && (
                      <div className="place-rating">
                        ⭐ {place.rating}
                      </div>
                    )}
                  </div>
                  <p className="place-address">{place.formatted_address}</p>
                </div>
              </div>
              {index < places.length - 1 && <hr className="place-divider" />}
            </React.Fragment>
          ))}
        </div>
      </Col>
    </div>
  );
};

export default SearchBar;