import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyTrips.css';

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch('http://localhost:7800/api/itineraries');
      if (response.ok) {
        const data = await response.json();
        setTrips(data);
      } else {
        console.error('Failed to fetch trips');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const showDetails = (trip) => {
    setSelectedTrip(trip);
  };

  const closeDetails = () => {
    setSelectedTrip(null);
  };

  return (
    <div className="my-trips-container">
      <h1>My Trips</h1>
      <div className="trip-cards">
        {trips.map((trip) => (
          <div key={trip._id} className="trip-card">
            <h2>{trip.title}</h2>
            <p>Destination: {trip.destination}</p>
            <p>Dates: {trip.startDate} - {trip.endDate}</p>
            <button onClick={() => showDetails(trip)}>Show Details</button>
          </div>
        ))}
      </div>
      {selectedTrip && (
        <div className="trip-details-modal">
          <div className="trip-details-content">
            <h2>{selectedTrip.title}</h2>
            <p>Destination: {selectedTrip.destination}</p>
            <p>Dates: {selectedTrip.startDate} - {selectedTrip.endDate}</p>
            <h3>Accommodation</h3>
            <ul>
              {selectedTrip.accommodation.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Transportation</h3>
            <ul>
              {selectedTrip.transportation.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Daily Itinerary</h3>
            {selectedTrip.days.map((day, index) => (
              <div key={index}>
                <h4>{day.title}</h4>
                <ul>
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
            <h3>Travel Tips</h3>
            <ul>
              {selectedTrip.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <button onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTrips;