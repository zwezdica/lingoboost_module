import { fetchFlashcards } from "./flashcards.api.js";
import { toggleTheme } from "./flashcards.utils.js";

let selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";
let currentPage = 1;

export function setupEventListeners() {
  document
    .getElementById("language-selector")
    ?.addEventListener("change", (e) => {
      selectedLanguage = e.target.value;
      currentPage = 1;
      fetchFlashcards(selectedLanguage, currentPage);
    });

  document.getElementById("next-btn")?.addEventListener("click", () => {
    currentPage++;
    fetchFlashcards(selectedLanguage, currentPage);
  });

  document.getElementById("previous-btn")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchFlashcards(selectedLanguage, currentPage);
    }
  });

  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);
}

export function getCurrentPage() {
  return currentPage;
}

export function getSelectedLanguage() {
  return selectedLanguage;
}
