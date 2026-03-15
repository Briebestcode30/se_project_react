// src/utils/weatherApi.js

// Fetch weather data from OpenWeather
export const getWeather = async ({ latitude, longitude }, apiKey) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather API error ${res.status}: ${text}`);
  }

  return res.json();
};

// Transform raw API data into app format
export const filterWeatherData = (data) => ({
  city: data.name,
  temp: {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  },
  type: getWeatherType(data.main.temp),
  condition: data.weather[0].main.toLowerCase(),
  isDay: isDay(data.sys, Date.now()),
});

// Check if current time is day or night
const isDay = ({ sunrise, sunset }, now) =>
  sunrise * 1000 < now && now < sunset * 1000;

// Determine weather type based on temperature
const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
