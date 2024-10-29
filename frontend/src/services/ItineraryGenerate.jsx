import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './itineraryGenerate.css';

const ItineraryGenerate = () => {
  const [itineraryData, setItineraryData] = useState({
    title: '',
    accommodation: [],
    transportation: [],
    days: [],
    tips: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();
  const { destination, startDate, endDate } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const generateItinerary = async () => {
      setLoading(true);
      const apikey = "AIzaSyDGL4Ic5bjIslpShWSMw856IcJrJ669RB8"; // Replace with your actual API key
      const genAI = new GoogleGenerativeAI(apikey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate a detailed trip plan for a family of 2 adults and 2 children with interests in history, art, nature, adventure, food, and nightlife visiting ${destination} from ${startDate} to ${endDate}. Include daily itineraries, accommodation recommendations, transportation options, and must-see attractions. Provide detailed explanations and practical tips for each activity.`;

      try {
        const result = await model.generateContent(prompt);
        const content = await result.response.text();
        parseItineraryContent(content);
      } catch (error) {
        console.error('Error generating itinerary:', error);
        setError('Failed to generate itinerary. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    generateItinerary();
  }, [destination, startDate, endDate]);

  const parseItineraryContent = (content) => {
    const lines = content.split('\n');
    let currentSection = '';
    const parsedData = {
      title: '',
      accommodation: [],
      transportation: [],
      days: [],
      tips: []
    };

    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('##')) {
        parsedData.title = line.replace('##', '').trim();
      } else if (line.startsWith('**Accommodation:**')) {
        currentSection = 'accommodation';
      } else if (line.startsWith('**Transportation:**')) {
        currentSection = 'transportation';
      } else if (line.startsWith('**Day')) {
        currentSection = 'days';
        parsedData.days.push({ title: line.replace(/\*/g, ''), activities: [] });
      } else if (line.startsWith('**Practical Tips:**')) {
        currentSection = 'tips';
      } else if (line !== '') {
        switch (currentSection) {
          case 'accommodation':
          case 'transportation':
          case 'tips':
            parsedData[currentSection].push(line.replace(/^\*\s*/, '').replace(/\*\*([^*]+)\*\*/, '$1'));
            break;
          case 'days':
            if (parsedData.days.length > 0) {
              parsedData.days[parsedData.days.length - 1].activities.push(line.replace(/^\*\s*/, '').replace(/\*\*([^*]+)\*\*/, '$1'));
            }
            break;
          default:
            break;
        }
      }
    });

    setItineraryData({
      ...parsedData,
      destination,
      startDate,
      endDate
    });
  };

  const saveItinerary = async () => {
    try {
      const response = await fetch('http://localhost:7800/api/itineraries/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itineraryData)
      });

      if (response.ok) {
        alert('Itinerary saved successfully!');
        navigate('/mytrips');
      } else {
        alert('Failed to save itinerary');
      }
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSection = (title, data, renderItem) => {
    if (!data || data.length === 0) return null;
    const isExpanded = expandedSection === title;

    return (
      <section className={`section ${isExpanded ? 'expanded' : ''}`}>
        <div className="section-header" onClick={() => toggleSection(title)}>
          <h2>{title}</h2>
          <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
        <div className={`section-content ${isExpanded ? 'expanded' : ''}`}>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{renderItem(item)}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  return (
    <div className="itinerary-generate unique-itinerary-wrapper">
      {loading ? (
        <div className="loader">Generating your personalized itinerary...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="itinerary-content">
          <h1>{itineraryData.title}</h1>
          {renderSection("Accommodation", itineraryData.accommodation, item => item)}
          {renderSection("Transportation", itineraryData.transportation, item => item)}
          {renderSection("Daily Itinerary", itineraryData.days.map((day, index) => ({
            title: day.title,
            activities: day.activities
          })), (day) => (
            <div className="day-itinerary">
              <h3>{day.title}</h3>
              <ul>
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
          {renderSection("Travel Tips", itineraryData.tips, item => item)}
          <button onClick={saveItinerary} className="save-itinerary-button">
            Save Itinerary
          </button>
        </div>
      )}
    </div>
  );
};

export default ItineraryGenerate;