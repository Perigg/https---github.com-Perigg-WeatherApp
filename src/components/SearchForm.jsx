import React from 'react';

const SearchForm = ({ onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    onSearch(city);
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" className='search-input'/>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;