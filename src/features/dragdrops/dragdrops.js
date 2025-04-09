import { checkAuthStatus } from "./dragdrops.auth.js";
import { initializeUI } from "./dragdrops.ui.js";
import { setupEventListeners, initializeGame } from "./dragdrops.events.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
  initializeUI();
  initializeDarkMode();
  setupEventListeners();

  setTimeout(() => {
    const languageDropdown = document.getElementById("languageDropdown");
    if (languageDropdown) {
      initializeGame(languageDropdown.value);
    }
  }, 0);
});

const initializeDarkMode = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  const isDarkMode =
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("theme"));

  if (isDarkMode) {
    themeToggle.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
    themeLabel.innerHTML = "☀️";
  }
};
