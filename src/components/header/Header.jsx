
import React from 'react';
import '../header/Header.css';
import headerLogo from './WeatherAppLogo.png'

const Header = () => {
    return (
        <div className="header">
            <img src={headerLogo} alt="Weather App Logo" className="logo" />
            <h1>Weather App</h1>
        </div>
    );
};

export default Header;