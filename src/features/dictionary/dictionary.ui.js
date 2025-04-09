import { LANGUAGES } from "./dictionary.constants.js";
import { getLocalStorage } from "./dictionary.utils.js";

export const initializeUI = () => {
  const app = document.getElementById("app");
  const selectedLanguage = getLocalStorage("selectedLanguage") || "fr";

  app.innerHTML = `
    <div class="container">
      <h1><i class="fas fa-book"></i> Dictionary</h1>
      <label for="wordInput">Enter word:</label>
      <input type="text" id="wordInput" placeholder="Enter word" 
             autocapitalize="off" autocorrect="off" spellcheck="false" />
      <label for="languageSelect">Select language:</label>
      <select id="languageSelect">
        ${LANGUAGES.map(
          (lang) =>
            `<option value="${lang.value}" ${
              lang.value === selectedLanguage ? "selected" : ""
            }>${lang.text}</option>`
        ).join("")}
      </select>
      <button id="searchButton">Search</button>
      <div id="result"></div>
      <button id="backToHomeButton" class="back-home-btn">⬅ Back to Home</button>
    </div>
  `;

  createThemeToggle();
};

export const createThemeToggle = () => {
  const themeToggle = document.createElement("div");
  themeToggle.className = "theme-switch";
  themeToggle.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle" title="Toggle dark mode">
      ${getLocalStorage("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  document.body.appendChild(themeToggle);
};

export const displayResult = (data) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="result-card">
      <h3>${data.word || "Unknown word"}</h3>
      <p class="translation"><strong>Translation:</strong> ${
        data.translation || "Not available"
      }</p>
      ${
        data.pronunciation
          ? `<p class="pronunciation"><strong>Pronunciation:</strong> ${data.pronunciation}</p>`
          : ""
      }
      ${
        data.examples
          ? `<div class="examples"><strong>Examples:</strong> ${formatExamples(
              data.examples
            )}</div>`
          : ""
      }
    </div>
  `;
};

export const displayError = (message) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      ${message}
    </div>
  `;
};

export const showLoading = (show) => {
  const searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.disabled = show;
    searchButton.innerHTML = show
      ? '<i class="fas fa-spinner fa-spin"></i> Searching...'
      : "Search";
  }
};

const formatExamples = (examples) => {
  if (Array.isArray(examples)) {
    return `<ul>${examples.map((ex) => `<li>${ex}</li>`).join("")}</ul>`;
  }
  return examples;
};
