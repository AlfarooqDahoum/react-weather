import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Manchester');
  const API_KEY = '675a60d8b2f6e70cf1f1e6870a825f35'; // Your OpenWeather API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };
    fetchData();
  }, [city, API_KEY]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <input
        className="search-bar"
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name..."
      />
      
      {weatherData && (
        <div className="weather-info">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
