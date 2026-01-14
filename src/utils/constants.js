// src/utils/constants.js

// Weather icon options mapped to OpenWeather API conditions
export const weatherOptions = [
  {
    day: true,
    condition: "clear", // OpenWeather: "Clear"
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds", // OpenWeather: "Clouds"
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/dark-clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/dark-cloudy.svg", import.meta.url).href,
  },
];

// Default icons if condition is missing or unmatched
export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.svg", import.meta.url).href,
  },
};

// ✅ Default clothing items (camelCase)
export const defaultClothingItems = [
  {
    _id: 1,
    name: "Boot",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png",
  },
  {
    _id: 2,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png",
  },
  {
    _id: 3,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png",
  },
  {
    _id: 4,
    name: "Dress",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Dress.png",
  },
  {
    _id: 5,
    name: "Hoodie",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png",
  },
  {
    _id: 6,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png",
  },
  {
    _id: 7,
    name: "Jeans",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png",
  },
  {
    _id: 8,
    name: "Loafers",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Loafers.png",
  },
  {
    _id: 9,
    name: "Sandals",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png",
  },
  {
    _id: 10,
    name: "Scarf",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Scarf.png",
  },
  {
    _id: 11,
    name: "Shorts",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png",
  },
  {
    _id: 12,
    name: "Skirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Skirt.png",
  },
  {
    _id: 13,
    name: "Sneakers",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png",
  },
  {
    _id: 14,
    name: "Sunglasses",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sunglasses.png",
  },
  {
    _id: 15,
    name: "Sweatshirt",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweatshirt.png",
  },
];

// Coordinates for weather API
export const coordinates = {
  latitude: 35.6485769,
  longitude: -80.4684191,
};

// OpenWeather API key
export const apiKey = "a4ad75474013fa969f7129087da607f4";
