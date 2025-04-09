import { searchWord } from "./dictionary.api.js";
import { displayResult, displayError, showLoading } from "./dictionary.ui.js";
import { setLocalStorage } from "./dictionary.utils.js";

export const setupEventListeners = () => {
  const wordInput = document.getElementById("wordInput");

  if (wordInput) {
    wordInput.addEventListener("input", handleInput);
    wordInput.addEventListener("change", handleInput);
    wordInput.addEventListener("blur", handleInput);
  }

  document
    .getElementById("searchButton")
    ?.addEventListener("click", handleSearch);
  document.getElementById("backToHomeButton")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);
  document.getElementById("languageSelect")?.addEventListener("change", (e) => {
    setLocalStorage("selectedLanguage", e.target.value);
  });
};

const handleInput = (e) => {
  const input = e.target;
  const cursorPos = input.selectionStart;
  input.value = input.value.toLocaleLowerCase();
  setTimeout(() => input.setSelectionRange(cursorPos, cursorPos), 0);
};

const handleSearch = async () => {
  const word = document.getElementById("wordInput").value.trim().toLowerCase();
  const language = document.getElementById("languageSelect").value;

  if (!word) {
    displayError("Please enter a word to search");
    return;
  }

  try {
    showLoading(true);
    const result = await searchWord(word, language);
    displayResult(result);
  } catch (error) {
    displayError(error.message || "Something went wrong. Please try again.");
  } finally {
    showLoading(false);
  }
};

export const toggleTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    setLocalStorage("theme", "dark");
    themeLabel.innerHTML = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    setLocalStorage("theme", "light");
    themeLabel.innerHTML = "🌙";
  }
};
