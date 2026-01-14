import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onAddClick }) {
  // ✅ Get the current temperature unit from context
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ClothesSection
          clothingItems={clothingItems.filter(
            (item) => item.weather === weatherData.type
          )}
          onCardClick={handleCardClick}
          onAddClick={onAddClick}
        />
      </section>
    </main>
  );
}

export default Main;
