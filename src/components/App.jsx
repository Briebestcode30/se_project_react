import { useState, useEffect } from "react";
import "./App.css";
import { coordinates, apiKey } from "../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../components/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch(console.error);
  }, []);
  if (!isWeatherDataLoaded) {
    return <p>LOADING...</p>;
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            clothingItems={clothingItems}
          />
        </div>
        <Footer />

        {/* Item preview modal */}
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
