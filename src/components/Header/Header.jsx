import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, setActiveModal }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" alt="Logo" src={logo} />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {currentUser ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name[0].toUpperCase()}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            className="header__login-btn"
            onClick={() => setActiveModal("login")}
          >
            Login
          </button>
          <button
            className="header__register-btn"
            onClick={() => setActiveModal("register")}
          >
            Register
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
