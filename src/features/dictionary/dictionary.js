import { initializeUI } from "./dictionary.ui.js";
import { setupEventListeners } from "./dictionary.events.js";
import { initializeDarkMode } from "./dictionary.utils.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
  initializeDarkMode();
  setupEventListeners();

  window.addEventListener("storage", (event) => {
    if (event.key === "selectedLanguage") {
      const languageSelect = document.getElementById("languageSelect");
      if (languageSelect) {
        languageSelect.value = localStorage.getItem("selectedLanguage") || "fr";
      }
    }
  });
});
