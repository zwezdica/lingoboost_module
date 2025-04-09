import { API_URL } from "./dragdrops.constants.js";
import { getLocalStorage } from "./dragdrops.utils.js";

export const fetchWords = async (language) => {
  const token = getLocalStorage("token");
  if (!token) throw new Error("No authentication token");

  const response = await fetch(`${API_URL}/words/${language}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error loading words");
  }

  return await response.json();
};
