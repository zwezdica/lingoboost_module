import { DIFFICULTIES, LANGUAGES } from "./bingo.constants.js";

let selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";

export function initializeUI() {
  const app = document.getElementById("app");

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";
  iconContainer.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  `;
  iconContainer.style.display = "none";
  app.appendChild(iconContainer);

  app.appendChild(createThemeToggle());

  const title = document.createElement("h1");
  title.innerHTML = '<i class="fas fa-gamepad"></i> Bingo Game';
  app.appendChild(title);

  const selectorContainer = document.createElement("div");
  selectorContainer.className = "selector-container";

  selectorContainer.appendChild(
    createSelector("level-selector", "Choose difficulty:", DIFFICULTIES)
  );

  const languageSelector = createSelector(
    "language-selector",
    "Choose language:",
    LANGUAGES
  );

  languageSelector.querySelector("select").value = selectedLanguage;
  selectorContainer.appendChild(languageSelector);

  const startButton = document.createElement("button");
  startButton.id = "start-button";
  startButton.textContent = "Start Game";
  selectorContainer.appendChild(startButton);

  app.appendChild(selectorContainer);

  const backToHomeButton = document.createElement("button");
  backToHomeButton.id = "back-to-home";
  backToHomeButton.textContent = "⬅ Back to Home";
  app.appendChild(backToHomeButton);

  const scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score";
  scoreDisplay.textContent = "Score: 0";
  app.appendChild(scoreDisplay);

  const bingoTable = document.createElement("table");
  bingoTable.id = "bingo-table";
  app.appendChild(bingoTable);

  app.appendChild(createModal("modal", "modal-title", "modal-message"));
  app.appendChild(createTranslationModal());
}

function createThemeToggle() {
  const themeToggle = document.createElement("div");
  themeToggle.className = "theme-switch";
  themeToggle.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle" title="Toggle dark mode">
      ${localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  return themeToggle;
}

function createSelector(id, labelText, options) {
  const container = document.createElement("div");
  container.className = "selector-item";

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;
  container.appendChild(label);

  const selector = document.createElement("select");
  selector.id = id;

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selector.appendChild(optionElement);
  });

  container.appendChild(selector);
  return container;
}

function createModal(id, titleId, messageId) {
  const modal = document.createElement("div");
  modal.id = id;
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-${id}">&times;</span>
      <h2 id="${titleId}"></h2>
      <p id="${messageId}"></p>
    </div>
  `;
  return modal;
}

function createTranslationModal() {
  const modal = document.createElement("div");
  modal.id = "translation-modal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-translation-modal">&times;</span>
      <h2 id="translation-modal-title"></h2>
      <input type="text" id="translation-input" placeholder="Enter translation" />
      <button id="submit-translation">Submit</button>
    </div>
  `;
  return modal;
}

export function showModal(title, message) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");

  if (modal && modalTitle && modalMessage) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "block";
  }
}
