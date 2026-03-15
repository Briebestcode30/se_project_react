export const baseUrl = "http://localhost:3001";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Helper to handle fetch responses
const handleServerResponse = async (res) => {
  if (res.ok) return res.json();
  const text = await res.text();
  throw new Error(`Error ${res.status}: ${text}`);
};

// Add optional token to headers
const getHeaders = (token) => {
  return token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}` }
    : defaultHeaders;
};

// -------------------- Items --------------------
export const getItems = async (token) => {
  const res = await fetch(`${baseUrl}/items`, { headers: getHeaders(token) });
  return handleServerResponse(res);
};

export const addItem = async ({ name, imageUrl, weather }, token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify({ name, imageUrl, weather }),
  });

  return handleServerResponse(res);
};

export const removeItem = async (itemId, token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });

  return handleServerResponse(res);
};

export const addCardLike = async (id, token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(token),
  });

  return handleServerResponse(res);
};

export const removeCardLike = async (id, token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(token),
  });

  return handleServerResponse(res);
};

// -------------------- User --------------------
export const updateUser = async ({ name, avatar }, token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify({ name, avatar }),
  });

  return handleServerResponse(res);
};

// -------------------- Auth --------------------
export const register = async ({ name, avatar, email, password }) => {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return handleServerResponse(res);
};

export const login = async ({ email, password }) => {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ email, password }),
  });
  return handleServerResponse(res);
};

export const checkToken = async (token) => {
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getHeaders(token),
  });
  return handleServerResponse(res);
};
