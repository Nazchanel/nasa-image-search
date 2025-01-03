import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const years = Array.from({ length: 105 }, (_, i) => 1920 + i);

const LandingPage: React.FC = () => {
  const [startYear, setStartYear] = useState(1920);
  const [endYear, setEndYear] = useState(2024);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartYear(Number(e.target.value));
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndYear(Number(e.target.value));
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (startYear > endYear) {
      setErrorMessage('End year must be on or after the start year.');
      return;
    }
    if (!searchTerm.trim()) {
      setErrorMessage('Please enter a search term.');
      return;
    }

    setErrorMessage('');

    const formattedSearchTerm = searchTerm.trim().replace(/\s+/g, '+');
    const url = `http://images-api.nasa.gov/search?q=${formattedSearchTerm}&year_start=${startYear}&year_end=${endYear}&media_type=image`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.collection.items.length === 0) {
        setErrorMessage('No results found for the given search term and year range.');
      } else {
        navigate('/display', { state: { items: data.collection.items } });
      }
    } catch (error) {
      setErrorMessage('An error occurred while searching. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="landing-page">
      <div className="box">
        <h1 style={{ color: 'black' }}>NASA Image Search</h1>
      </div>
      <input
        type="text"
        placeholder="Enter in phrase"
        className="text-input"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyDown={handleKeyDown}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="year-selection">
        <p style={{ color: 'white' }}>Select Year Range:</p>
        <select value={startYear} onChange={handleStartYearChange} className="year-dropdown">
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select value={endYear} onChange={handleEndYearChange} className="year-dropdown">
          {years.filter(year => year >= startYear).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSearch} className="search-button">Search!</button>
    </div>
  );
};

export default LandingPage;
