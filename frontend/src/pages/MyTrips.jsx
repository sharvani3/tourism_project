import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/mytrips.css';

const MyTrips = () => {
  const [savedItineraries, setSavedItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/itineraries/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const itineraries = await response.json();
          setSavedItineraries(itineraries);
        } else {
          console.error('Failed to fetch itineraries');
        }
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, []);

  const viewItinerary = (itineraryId) => {
    navigate(`/itinerary/${itineraryId}`);
  };

  return (
    <div className="my-trips-container">
      <h1>My Trips</h1>
      {savedItineraries.length === 0 ? (
        <p>No saved itineraries yet.</p>
      ) : (
        <ul className="itinerary-list">
          {savedItineraries.map((itinerary, index) => (
            <li key={index} onClick={() => viewItinerary(itinerary._id)}>
              <h2>{itinerary.title}</h2>
              <p>{itinerary.destination}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTrips;
