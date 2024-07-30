import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

import './itineraryGenerate.css';

const ItineraryGenerate = () => {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { destination, startDate, endDate } = location.state || {};

  useEffect(() => {
    const generateItinerary = async () => {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt =`Generate a detailed trip plan for a family of 2 adults and 2 children with interests in history, art, nature, adventure, food, and nightlife visiting ${destination} from ${startDate} to ${endDate}. Include daily itineraries, accommodation recommendations, transportation options, and must-see attractions. Provide detailed explanations and practical tips for each activity.`;

      try {
        const result = await model.generateContent(prompt);
        setItinerary(result.response.text());
        console.log(result.response.text());
        setLoading(false);
      } catch (error) {
        console.error('Error generating itinerary:', error);
        setLoading(false);
      }
    };

    generateItinerary();
  }, [destination, startDate, endDate]);

  return (
    <div className="itinerary-container">
      <h1>Your Itinerary for {destination}</h1>
      {loading ? (
        <div className="loader">Generating your personalized itinerary...</div>
      ) : (
        <div className="itinerary-content" dangerouslySetInnerHTML={{ __html: itinerary }} />
      )}
    </div>
  );
};

export default ItineraryGenerate;