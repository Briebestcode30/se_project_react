// src/utils/auth.js
import { baseUrl } from "./api";

// Helper to handle fetch responses
const handleServerResponse = async (res) => {
  if (res.ok) return res.json();
  const text = await res.text();
  throw new Error(`Error ${res.status}: ${text}`);
};

export const register = async ({ name, avatar, email, password }) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });

  return handleServerResponse(res);
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return handleServerResponse(res);
};

export const checkToken = async (token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return handleServerResponse(res);
};
