import React, { useState } from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ weatherData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={`current-weather ${isExpanded ? 'expanded' : ''}`}>
      {weatherData && (
        <>
          <h2 className="city-name">{weatherData.name}</h2>
          <div className="weather-info">
            <div className="icon-info">
              <img
                src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                className="weather-icon"
              />
            </div>
            <div className="text-info">
              <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
            </div>
            <p className="date-time">Date and Time: {new Date().toLocaleString()}</p>
          </div>
          {isExpanded && (
            <>
              <p>Wind Speed: {Math.round(weatherData.wind.speed)} m/s</p>
              <p>Humidity: {Math.round(weatherData.main.humidity)}%</p>
              <p>Pressure: {Math.round(weatherData.main.pressure)} hPa</p>
              <p>Min Temperature: {Math.round(weatherData.main.temp_min)}°C</p>
              <p>Max Temperature: {Math.round(weatherData.main.temp_max)}°C</p>
            </>
          )}
          <button className="more-button" onClick={toggleExpand}>
            {isExpanded ? 'Hide' : 'More'}
          </button>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;


