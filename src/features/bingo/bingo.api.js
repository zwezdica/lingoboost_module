import { API_URL } from "./bingo.constants.js";

export async function fetchWords(level, language) {
  const response = await fetch(
    `${API_URL}/words?level=${level}&language=${language}`
  );
  if (!response.ok) throw new Error("Error fetching words");
  return await response.json();
}

export async function checkTranslation(wordId, language, userTranslation) {
  const response = await fetch(`${API_URL}/check-translation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      wordId,
      language,
      userTranslation: userTranslation.toLowerCase(),
    }),
  });

  if (!response.ok) throw new Error("Error checking translation");
  return await response.json();
}
