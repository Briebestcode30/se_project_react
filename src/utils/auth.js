import { handleServerResponse, base_url } from "./api";

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${base_url}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${base_url}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${base_url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
