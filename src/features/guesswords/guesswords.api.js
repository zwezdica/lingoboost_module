const BASE_URL = "/api";

export async function fetchKeyboard(language) {
  try {
    const response = await fetch(`${BASE_URL}/keyboards/${language}`);
    const data = await response.json();

    if (response.ok && data.keyboard) {
      return data.keyboard;
    }
    throw new Error(data.message || "Failed to fetch keyboard");
  } catch (error) {
    console.error("Keyboard error:", error);
    throw error;
  }
}

export async function startGame(language, wordIndex, token) {
  try {
    const response = await fetch(
      `${BASE_URL}/guessWords/start?lang=${language}&index=${wordIndex}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to start game");
    }

    return await response.json();
  } catch (error) {
    console.error("Start game error:", error);
    throw error;
  }
}

export async function submitGuess(letter, language, wordIndex, token) {
  try {
    const response = await fetch(`${BASE_URL}/guessWords/guess/${letter}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        letter,
        language,
        currentWordIndex: wordIndex,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error processing guess");
    }

    return await response.json();
  } catch (error) {
    console.error("Guess error:", error);
    throw error;
  }
}
