// App.js

import "./App.css";
import { useState } from "react";

import clearImage from './BG/clear.jpg';
import cloudImage from './BG/cloud.jpg';
import drizzleImage from './BG/drizzle.jpg';
import humidityImage from './BG/humidity.jpg';
import rainImage from './BG/rain.jpg';
import snowImage from './BG/snow.jpg';
import windImage from './BG/wind.jpg';

const api = {
  key: "675a60d8b2f6e70cf1f1e6870a825f35",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  function getWeatherImage(weatherCondition) {
    switch (weatherCondition) {
      case 'Clear':
        return clearImage;
      case 'Clouds':
        return cloudImage;
      case 'Drizzle':
        return drizzleImage;
      case 'Humidity':
        return humidityImage;
      case 'Rain':
        return rainImage;
      case 'Snow':
        return snowImage;
      case 'Wind':
        return windImage;
      default:
        return '';
    }
  }

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        <div>
          <input
            type="text"
            placeholder="Enter a city name..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <p>{weather.name}</p>
            <img
              src={getWeatherImage(weather.weather[0].main)}
              alt={weather.weather[0].main}
              style={{ maxWidth: '100px' }} // Adjust styles as needed
            />
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
