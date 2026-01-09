import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  if (!weatherData || !weatherData.temp) {
    return null;
  }
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  const weatherOption = weatherOptions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
  );

  const finalWeatherOption =
    weatherOption ?? defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg;{currentTemperatureUnit}
      </p>
      <img
        src={finalWeatherOption.url}
        alt="Current weather"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
