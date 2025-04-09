import { initializeUI } from "./quiz.ui.js";
import { setupEventListeners } from "./quiz.events.js";
import { initializeDarkMode, checkAuthentication } from "./quiz.utils.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication();
  initializeUI();
  initializeDarkMode();
  setupEventListeners();

  window.addEventListener("storage", (event) => {
    if (event.key === "theme") initializeDarkMode();
    if (event.key === "selectedLanguage") {
      const language = getLocalStorage("selectedLanguage") || "fr";
      document.getElementById("language-selector").value = language;
    }
  });
});
