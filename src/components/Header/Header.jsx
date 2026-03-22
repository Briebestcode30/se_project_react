import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, setActiveModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* LEFT SIDE */}
      <div className="header__left">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="header__right">
        {/* Temperature unit toggle */}
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__add-clothes-btn"
              onClick={handleAddClick}
            >
              + Add Clothes
            </button>

            <NavLink to="/profile" className="header__nav-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>

                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </NavLink>
          </>
        ) : (
          <div className="header__auth-buttons">
            {/* Sign Up button */}
            <button
              type="button"
              className="header__register-btn"
              onClick={() => setActiveModal("register")}
            >
              Sign Up
            </button>

            {/* Log In button */}
            <button
              type="button"
              className="header__login-btn"
              onClick={() => setActiveModal("login")}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
