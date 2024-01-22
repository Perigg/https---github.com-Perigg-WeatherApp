import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value.trim();

    setErrorMessage('');

    if (city) {
      try {
        setLoading(true);

        const apiKey = '3f1d37687623975b9b4b003e66b7da6e';

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );


        if (!response.ok) {
          const data = await response.json();


          if (data.cod === '404') {
            setErrorMessage('City not found. Please enter a valid city.');
          } else {

            setErrorMessage(`API error: ${data.message}`);
          }
        } else {

          const data = await response.json();
          onSearch(city);

          e.target.elements.city.value = '';
        }
      } catch (error) {

        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {

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