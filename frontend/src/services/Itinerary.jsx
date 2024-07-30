import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./itinerary.css";
import axios from "axios";

const Itinerary = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/api/itinerary', { location, startDate, endDate });
      //setItinerary(response.data);
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
            />
          </div>
          <div className="start__field">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="end__field">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="btn__submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Itinerary;