import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onAddClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherFilteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );

  return (
    <main>
      {" "}
      <WeatherCard weatherData={weatherData} />
      ```
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ClothesSection
          clothingItems={weatherFilteredItems}
          onCardClick={handleCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </main>
  );
}

export default Main;
