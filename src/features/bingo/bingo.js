import { initializeUI } from "./bingo.ui.js";
import { initializeDarkMode } from "./bingo.utils.js";
import { setupEventListeners } from "./bingo.events.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeUI();
  initializeDarkMode();
  setupEventListeners();
});
