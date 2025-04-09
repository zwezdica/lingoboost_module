import { initializeUI } from "./flashcards.ui.js";
import { initializeDarkMode } from "./flashcards.utils.js";
import { setupEventListeners } from "./flashcards.events.js";
import { fetchFlashcards } from "./flashcards.api.js";
import { checkAuthStatus } from "./flashcards.auth.js";

document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
  initializeUI();
  initializeDarkMode();
  setupEventListeners();
  fetchFlashcards();
});
