import React from 'react';
import '../styles/Weather.css';

const CurrentWeather = ({ weatherData }) => {
  return (
    <div className="current-weather">
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
           
          </div>
          <p className="date-time">Date and Time: {new Date().toLocaleString()}</p>
        </>
      )}
    </div>
  );
};

export default CurrentWeather;



