import { fetchKeyboard } from "./guesswords.api.js";
import {
  handleGuess,
  startGame,
  loadNextWord,
  loadPreviousWord,
} from "./guesswords.game.js";
import { toggleTheme } from "./guesswords.utils.js";
import { displayKeyboard } from "./guesswords.ui.js";

let selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";

export function setupEventListeners() {
  document
    .getElementById("language-selector")
    ?.addEventListener("change", async (e) => {
      selectedLanguage = e.target.value;
      localStorage.setItem("selectedLanguage", selectedLanguage);
      try {
        const keyboard = await fetchKeyboard(selectedLanguage);
        displayKeyboard(keyboard);
      } catch (error) {
        console.error("Failed to load keyboard:", error);
      }
    });

  document.getElementById("start-game")?.addEventListener("click", () => {
    document.getElementById("start-game").disabled = true;
    startGame();
  });

  document
    .getElementById("guess-button")
    ?.addEventListener("click", handleGuess);

  document.getElementById("back-home-button")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document
    .getElementById("next-button")
    ?.addEventListener("click", loadNextWord);

  document
    .getElementById("previous-button")
    ?.addEventListener("click", loadPreviousWord);

  document.getElementById("letterInput")?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 1);
  });

  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);

  document
    .getElementById("keyboard-container")
    ?.addEventListener("click", (e) => {
      if (e.target.classList.contains("keyboard-key")) {
        document.getElementById("letterInput").value = e.target.textContent;
        handleGuess();
      }
    });
}

export function getSelectedLanguage() {
  return selectedLanguage;
}
