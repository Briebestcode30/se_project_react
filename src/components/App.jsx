import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { coordinates, apiKey } from "../utils/constants";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../utils/api";

import { register, login, checkToken } from "../utils/auth";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ItemModal from "./ItemModal/ItemModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import LoginModal from "./LoginModal/LoginModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import Profile from "./Profile/Profile";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/" replace />;
  return children;
}

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

  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const isLoggedIn = !!currentUser;

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setActiveModal("login");
      return;
    }

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error("Add item error:", err));
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) return console.error("Missing auth token");

    removeItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Delete item error:", err))
      .finally(() => closeActiveModal());
  };

  const handleCardLike = (item, like) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const apiCall = like ? addCardLike : removeCardLike;

    apiCall(item._id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === item._id ? updatedCard : c)),
        );
      })
      .catch((err) => console.error("Like error:", err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };

    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
        setIsWeatherDataLoaded(true);
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const token = localStorage.getItem("jwt");
    if (!token) return;

    getItems(token)
      .then((data) => setClothingItems(data.reverse()))
      .catch((err) => console.error("Items error:", err));
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        if (user && user._id) setCurrentUser(user);
        else localStorage.removeItem("jwt");
      })
      .catch((err) => {
        console.error("Token error:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(() => login({ email, password }))
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          closeActiveModal();
        }
      })
      .catch((err) => console.error("Register/Login error:", err));
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          closeActiveModal();
        }
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return console.error("Missing auth token");

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Update profile error:", err));
  };

  if (!isWeatherDataLoaded) return <p>LOADING...</p>;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              setActiveModal={setActiveModal}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onAddClick={handleAddClick}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute user={currentUser}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      setActiveModal={setActiveModal}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            setActiveModal={setActiveModal}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            setActiveModal={setActiveModal}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
