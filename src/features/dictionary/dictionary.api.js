import { API_URL } from "./dictionary.constants.js";

export const searchWord = async (word, language) => {
  const response = await fetch(
    `${API_URL}/search?word=${encodeURIComponent(word)}&language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Word not found");
  }

  return await response.json();
};
