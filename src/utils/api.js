const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const addItem = ({ name, imageUrl, weather }, token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
};

export const removeItem = (itemId, token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (id, token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (id, token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const updateUser = ({ name, avatar }, token) => {
  if (!token) return Promise.reject("Missing auth token");

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
