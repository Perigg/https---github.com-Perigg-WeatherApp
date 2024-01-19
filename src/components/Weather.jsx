import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import SearchForm from './SearchForm';
import WeatherDetails from './WeatherDetails';
import '../styles/Weather.css';
import Header from './Header';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Stockholm');
  const apiKey = '3f1d37687623975b9b4b003e66b7da6e';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Search Query:', searchQuery);
        console.log('API Key:', apiKey);

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
  }, [searchQuery, apiKey]);

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