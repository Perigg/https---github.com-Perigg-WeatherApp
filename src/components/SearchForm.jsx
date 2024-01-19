import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value.trim(); // Trim to remove leading/trailing spaces

    // Reset previous error message
    setErrorMessage('');

    // Check if the city value is not empty
    if (city) {
      try {
        setLoading(true);

        const apiKey = '3f1d37687623975b9b4b003e66b7da6e';
        // Make the API call
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        // Check if the API response indicates a valid city
        if (!response.ok) {
          const data = await response.json();

          // Handle the case where the city is not found
          if (data.cod === '404') {
            setErrorMessage('City not found. Please enter a valid city.');
          } else {
            // Handle other API errors
            setErrorMessage(`API error: ${data.message}`);
          }
        } else {
          // Handle the case where the API call was successful
          const data = await response.json();
          onSearch(city);
          // Provide feedback to the user, for example, clear the input field
          e.target.elements.city.value = '';
        }
      } catch (error) {
        // Handle other potential errors (e.g., network issues)
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      // Handle the case where the city value is empty
      setErrorMessage('Please enter a valid city.');
    }
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" className="search-input" />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default SearchForm;