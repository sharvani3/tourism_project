import React, { useRef, useEffect, useState } from 'react';
import './search.bar.css';
import { Col, Form } from 'reactstrap';

const SearchBar = () => {
  const locationRef = useRef(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(locationRef.current, {
        types: ["(cities)"], // restricts suggestions to cities
      });

      // Handle place selection
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
          searchHandler(place.name); // Call search with selected city
        }
      });
    }
  }, []);

  const searchHandler = (location = locationRef.current.value) => {
    if (location === '') {
      return alert('Enter Location');
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: `popular places in ${location}`,
      fields: ["name", "geometry", "photos", "place_id"],
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results); // Save results to state for rendering
      } else {
        alert('No results found');
      }
    });
  };

  return (
    <Col lg="100">
      <div className="search__bar" align="center">
        <Form className="d-flex align-items-center gap-4" onSubmit={(e) => e.preventDefault()}>
          <span>
            <i className="ri-map-pin-fill"></i>
          </span>
          <div>
            <input
              type="text"
              placeholder="Explore places"
              ref={locationRef}
              id="searchInput"
            />
          </div>
          <span className="search__icon" onClick={() => searchHandler()}>
            <i className="ri-search-line"></i>
          </span>
        </Form>

        {/* Display the popular places in the selected city */}
        <div id="results">
          {places.map((place) => (
            <div key={place.place_id} className="place-card">
              <h3>{place.name}</h3>
              <img
                src={place.photos ? place.photos[0].getUrl() : "default-image-url.jpg"}
                alt={place.name}
                style={{ width: '100%', maxWidth: '300px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};

export default SearchBar;
