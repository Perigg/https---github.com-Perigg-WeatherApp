
import React from 'react';
import '../styles/Header.css';
import headerLogo from '../assets/weatherAppLogo.png';


const Header = () => {
    return (
        <div className="header">
            <img src={headerLogo} alt="Weather App Logo" className="logo" />
            <h1>Weather App</h1>

        </div>
    );
};

export default Header;