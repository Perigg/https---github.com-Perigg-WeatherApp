import React, { useState, useEffect } from 'react';
import CurrentWeather from '../currentWeather/CurrentWeather';
import SearchForm from '../searchForm/SearchForm';
import WeatherDetails from '../weatherDetails/WeatherDetails';
import './Weather.css';
import Header from '../header/Header';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Stockholm');

  useEffect(() => {
    const apiKey = '7a637f71a69de1b80dda7240df8bc77e';
  
    const fetchData = async () => {
      try {
        console.log('Search Query:', searchQuery);
  
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        console.log('Weather Data:', data);
        setWeatherData(data);
  
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}&units=metric`
        );
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
        console.log('Forecast Data:', forecastData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    fetchData();
  }, [searchQuery]);

  const handleSearch = (city) => {
    setSearchQuery(city);
  };

  return (
    <div className="weather-container">
    <Header />
    <SearchForm onSearch={handleSearch} />
    <div className="content-container">
      <div className="start-box">
        <CurrentWeather weatherData={weatherData} />
      </div>
      <div className="details-box">
        <WeatherDetails forecastData={forecastData} />
      </div>
    </div>
  </div>
  );
};

export default Weather;