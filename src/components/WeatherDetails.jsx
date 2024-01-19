import React from 'react';

const WeatherDetails = ({ forecastData }) => {
  
  if (!forecastData) {
    return <p>No forecast data available.</p>;
  }
  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const filterDailyReports = (list) => {
    // An object to hold unique days
    const dailyData = {};
  
    // Loop through each report
    list.forEach((report) => {
      const date = report.dt_txt.split(' ')[0]; // Extract the date from dt_txt
  
      // Check if the report is for a future day
      if (new Date(date) > new Date()) {
        // If the day doesn't exist in the object or if the temperature is higher than max or lower than min
        if (!dailyData[date]) {
          dailyData[date] = {
            minTemp: Math.round(report.main.temp_min),
            maxTemp: Math.round(report.main.temp_max),
            icon: report.weather[0]?.icon || '',
            description: report.weather[0]?.description || 'N/A',
            windSpeed: Math.round(report.wind?.speed) || 'N/A',
            humidity: Math.round(report.main?.humidity) || 'N/A',
            pressure: Math.round(report.main?.pressure) || 'N/A',
          };
        } else {
          // Update min and max only if the current temperature is outside the existing range
          if (report.main.temp < dailyData[date].minTemp) {
            dailyData[date].minTemp = Math.round(report.main.temp);
          }
          if (report.main.temp > dailyData[date].maxTemp) {
            dailyData[date].maxTemp = Math.round(report.main.temp);
          }
        }
      }
    });
  
    // Convert to array format for easier rendering
    const aggregatedArray = Object.keys(dailyData).map((date) => ({
      dt: new Date(date + 'T12:00:00Z').getTime() / 1000,
      minTemp: dailyData[date].minTemp,
      maxTemp: dailyData[date].maxTemp,
      icon: dailyData[date].icon,
      description: dailyData[date].description,
      windSpeed: dailyData[date].windSpeed,
      humidity: dailyData[date].humidity,
      pressure: dailyData[date].pressure,
    }));
  
    return aggregatedArray;
  };

  
  const filteredReports = forecastData ? filterDailyReports(forecastData.list) : [];
  

  return (
    <div className="weather-details">
      {filteredReports.length > 0 && (
        <>
          <h2 className='five-days'>5-Day Forecast</h2>
          <div className="forecast-days-container">
            {filteredReports.map((day) => (
              <div key={day.dt} className="forecast-day">
                <p className='day-name'>{getFormattedDate(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/w/${day.icon}.png`}
                  alt="Weather Icon"
                />
                <p>Min Temp: {day.minTemp !== undefined ? day.minTemp : 'N/A'}°C</p>
                <p>Max Temp: {day.maxTemp !== undefined ? day.maxTemp : 'N/A'}°C</p>
                <p>Description: {day.description}</p>
                <p>Wind Speed: {day.windSpeed} m/s</p>
                <p>Humidity: {day.humidity}%</p>
                <p>Pressure: {day.pressure} hPa</p>
                
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDetails;