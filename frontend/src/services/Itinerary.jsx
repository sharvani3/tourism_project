import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./itinerary.css";
import axios from "axios";

const Itinerary = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error message
    setError("");

    // Check if start date is less than end date
    if (new Date(startDate) >= new Date(endDate)) {
      setError("End Date must be later than Start Date.");
      return;
    }

    try {
      // const response = await axios.post('/api/itinerary', { location, startDate, endDate });
      // setItinerary(response.data);
      // Navigate to ItineraryGenerate component after setting the itinerary
      navigate("/itineraryGenerate", { 
        state: { 
          destination: location, 
          startDate: startDate, 
          endDate: endDate 
        } 
      });
    } catch (error) {
      console.error('Error generating itinerary', error);
    }
  };

  return (
    <>
      <h2>Plan your trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="itinerary__container">
          <div className="location">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required // Make this field mandatory
            />
          </div>
          <div className="start__field">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required // Make this field mandatory
            />
          </div>
          <div className="end__field">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required // Make this field mandatory
            />
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <button className="btn__submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Itinerary;
