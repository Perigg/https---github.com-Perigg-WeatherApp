import React from 'react';

const WeatherDetails = ({ forecastData }) => {
  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const filterDailyReports = (list) => {
    // ett objekt för att hålla unika dagar
    const dailyData = {};

    // Loopa igenom varje rapport
    list.forEach((report) => {
      const date = report.dt_txt.split(' ')[0]; // Extrahera datumet från dt_txt

      // Kontrollera om rapporten är för en kommande dag
      if (new Date(date) > new Date()) {
        // Om dagen inte finns i objektet eller om temperaturen är högre än max eller lägre än min
        if (!dailyData[date] || report.main.temp > dailyData[date].maxTemp) {
          dailyData[date] = {
            minTemp: Math.round(report.main.temp),
            maxTemp: Math.round(report.main.temp),
            icon: report.weather[0]?.icon || '',
            description: report.weather[0]?.description || 'N/A',
            windSpeed: Math.round(report.wind?.speed) || 'N/A',
            humidity: Math.round(report.main?.humidity) || 'N/A',
            pressure: Math.round(report.main?.pressure) || 'N/A',
            
          };
        } else {
          // Uppdatera min och max om temperaturen är högre eller lägre
          dailyData[date].minTemp = Math.min(dailyData[date].minTemp, report.main.temp);
          dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, report.main.temp);
        }
      }
    });

    // Konvertera till array-format för att underlätta rendering
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

  console.log('Forecast Data:', forecastData);
  const filteredReports = forecastData ? filterDailyReports(forecastData.list) : [];
  console.log('Filtered Reports:', filteredReports);

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