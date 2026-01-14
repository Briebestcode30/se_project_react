// src/utils/weatherApi.js

import { handleServerResponse } from "./api";

// Fetch weather data from OpenWeather
export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(handleServerResponse);
};

// Filter raw API data into the format your app uses
export const filterWeatherData = (data) => {
  return {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
    type: getWeatherType(data.main.temp),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };
};

// Check if current time is day or night
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// Determine weather type by temperature
const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
