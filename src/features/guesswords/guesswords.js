import { initializeUI, displayKeyboard } from "./guesswords.ui.js";
import { initializeDarkMode } from "./guesswords.utils.js";
import { setupEventListeners } from "./guesswords.events.js";
import { checkAuthStatus } from "./guesswords.auth.js";
import { fetchKeyboard } from "./guesswords.api.js";

document.addEventListener("DOMContentLoaded", async () => {
  checkAuthStatus();
  initializeUI();
  initializeDarkMode();
  setupEventListeners();

  try {
    const keyboard = await fetchKeyboard(
      localStorage.getItem("selectedLanguage") || "fr"
    );
    displayKeyboard(keyboard);
  } catch (error) {
    console.error("Failed to load keyboard:", error);

    displayKeyboard("qwertyuiopasdfghjklzxcvbnm".split(""));
  }
});
