import React, { useState } from 'react';
import './itinerary.css';

const Itinerary = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    // Handle the submit action
    alert(`Location: ${location}\nStart Date: ${startDate}\nEnd Date: ${endDate}`);
  };

  return (
  <>
  <h2>Plan your trip</h2>
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
  </>
    
  );
};

export default Itinerary;
