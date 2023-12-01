import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York'); // Default city

  const API_KEY = '675a60d8b2f6e70cf1f1e6870a825f35'; // Your OpenWeather API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric' // Change this to 'imperial' for Fahrenheit
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
    <div>
      <h2>Weather App</h2>
      <input type="text" value={city} onChange={handleCityChange} />
      {weatherData && (
        <div>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;