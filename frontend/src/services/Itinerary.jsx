import React, { useState } from 'react';
import './itinerary.css';
import axios from 'axios';

const Itinerary = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [itinerary, setItinerary] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/itinerary', { location, startDate, endDate });
      setItinerary(response.data);
    } catch (error) {
      console.error('Error generating itinerary', error);
    }
    alert(`Location: ${location}\nStart Date: ${startDate}\nEnd Date: ${endDate}`);
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
      <button className='btn__submit' onClick={handleSubmit}>Submit</button>
    </div>
  </form>
  {itinerary && (
        <div>
          <h2>Itinerary for {itinerary.location}</h2>
          <p>From: {new Date(itinerary.startDate).toDateString()}</p>
          <p>To: {new Date(itinerary.endDate).toDateString()}</p>
          <h3>Places to Visit:</h3>
          <ul>
            {itinerary.places.map((place, index) => (
              <li key={index}>
                <h4>{place.name}</h4>
                <p>{place.address}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
  </>
    
  );
};

export default Itinerary;
