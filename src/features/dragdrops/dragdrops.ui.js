import { LANGUAGES, WORDS_PER_PAGE } from "./dragdrops.constants.js";
import {
  getLocalStorage,
  createElement,
  shuffleArray,
} from "./dragdrops.utils.js";

let words = [];
let currentIndex = 0;

export const initializeUI = () => {
  const app = document.getElementById("app");
  const savedLanguage = getLocalStorage("selectedLanguage") || "fr";

  const iconContainer = createElement("div", {
    className: "icon-container",
    innerHTML: `<svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>`,
    style: "display: none",
  });

  const themeToggle = createElement("div", {
    className: "theme-switch",
    innerHTML: `
      <input type="checkbox" id="theme-toggle">
      <label for="theme-toggle" title="Toggle dark mode">
        ${getLocalStorage("theme") === "dark" ? "☀️" : "🌙"}
      </label>
    `,
  });

  // Game container
  const gameContainer = createElement("div", { className: "game-container" }, [
    createElement("h1", {
      innerHTML: '<i class="fas fa-hand-paper"></i> Drag and Drop Game',
    }),
    createLanguageDropdown(savedLanguage),
    createScoreboard(),
    createWordsContainer(),
    createDropContainer(),
    createNavigationButtons(),
    createElement("button", {
      id: "backToHome",
      textContent: "⬅ Back to Home",
    }),
  ]);

  app.append(iconContainer, themeToggle, gameContainer);
};

const createLanguageDropdown = (savedLanguage) => {
  const dropdown = createElement("select", { id: "languageDropdown" });
  LANGUAGES.forEach((lang) => {
    dropdown.appendChild(
      createElement("option", {
        value: lang.value,
        textContent: lang.text,
        selected: lang.value === savedLanguage,
      })
    );
  });
  return dropdown;
};

const createScoreboard = () =>
  createElement("div", {
    id: "scoreboard",
    innerHTML: `
    <p>Correct answers: <span id="correctCount">0</span></p>
    <p>Incorrect answers: <span id="incorrectCount">0</span></p>
  `,
  });

const createWordsContainer = () =>
  createElement("div", {
    className: "term-row",
    id: "words-container",
  });

const createDropContainer = () =>
  createElement("div", {
    className: "translation-row",
    id: "drop-container",
  });

const createNavigationButtons = () =>
  createElement("div", {
    className: "navigation-buttons",
    innerHTML: `
    <button id="prevButton">Previous</button>
    <button id="nextButton">Next</button>
  `,
  });

export const displayWords = (words, currentIndex) => {
  const wordsContainer = document.getElementById("words-container");
  const dropContainer = document.getElementById("drop-container");

  wordsContainer.innerHTML = "";
  dropContainer.innerHTML = "";

  const currentWords = words.slice(currentIndex, currentIndex + WORDS_PER_PAGE);

  currentWords.forEach((word) => {
    wordsContainer.appendChild(
      createElement("div", {
        className: "word-card",
        textContent: word.word,
        draggable: "true",
      })
    );
  });

  const translations = currentWords.map((word) => ({
    translation: word.translation || "No translation available",
    correctWord: word.word,
  }));

  shuffleArray(translations).forEach((trans) => {
    dropContainer.appendChild(
      createElement("div", {
        className: "icon-card",
        textContent: trans.translation,
        dataset: { translation: trans.correctWord },
      })
    );
  });
};

export const updateScoreboard = (correct, incorrect) => {
  document.getElementById("correctCount").textContent = correct;
  document.getElementById("incorrectCount").textContent = incorrect;
};
