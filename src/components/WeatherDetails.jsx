import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
function WeatherDetails({ weatherData }) {
  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  const date = new Date(weatherData.dt * 1000).toLocaleDateString("en-US");
  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const cityName = weatherData.name;
  const temprature = Math.round(weatherData.main.temp);
  const celsius = weatherData.main.temp;
  const fahrenheit = Math.round(celsius * (9 / 5) + 32);
  const humidity = weatherData.main.humidity;
  const precipitation = weatherData.rain?.["1h"] || 0;
  const windSpeedKmh = Math.round(weatherData.wind.speed * 3.6).toFixed(2);
  const main = weatherData.weather[0].main;

  return (
    <div>
      <div className="wDetails">
        <h1> {cityName}</h1>
        <div className="row">
          <div className="div-1">
            <p>
              {" "}
              <CiLocationOn></CiLocationOn>
              {cityName}
            </p>
            <p>
              <MdDateRange></MdDateRange> {date} | {dayName}
            </p>
            <h1>
              {temprature}° C | {fahrenheit}° F
            </h1>
            <h2>{main}</h2>
            <p>Humidity: {humidity} %</p>
            <p>Precipitation: {precipitation} %</p>
            <p>Wind: {windSpeedKmh} km/h</p>
          </div>
          <div className="div-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
