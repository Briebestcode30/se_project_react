import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.temp) {
    return null;
  }
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
  );

  const finalWeatherOption =
    weatherOption ?? defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={finalWeatherOption.url}
        alt="Current weather"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
