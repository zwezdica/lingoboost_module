import { LANGUAGES } from "./guesswords.constants.js";

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

  app.innerHTML += `
    <div class="theme-switch">
      <input type="checkbox" id="theme-toggle">
      <label for="theme-toggle" title="Toggle dark mode">
        ${localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
      </label>
    </div>
    <h1><i class="fas fa-keyboard"></i> Guess Word</h1>
    <div id="language-container">
      <label for="language-selector">Choose a language:</label>
      <select id="language-selector">
        ${LANGUAGES.map(
          (lang) =>
            `<option value="${lang.value}" ${
              lang.value === (localStorage.getItem("selectedLanguage") || "fr")
                ? "selected"
                : ""
            }>${lang.text}</option>`
        ).join("")}
      </select>
    </div>

    <div id="word-container">
      <p class="hidden-word">_ _ _ _</p>
    </div>

    <button id="start-game">Start Game</button>

    <p id="messageBox"></p>
    <p id="scoreboard">Score: 0</p>

    <input type="text" id="letterInput" maxlength="1" placeholder="Enter a letter">
    <button id="guess-button">Guess</button>

    <div id="meaningBox"></div>

    <button id="back-home-button">⬅ Back to home</button>
    <button id="previous-button">Previous Word</button>
    <button id="next-button">Next Word</button>
    <div id="keyboard-container"></div>
  `;
}

export function displayKeyboard(keys) {
  const keyboardContainer = document.getElementById("keyboard-container");
  if (!keyboardContainer) {
    console.error("Keyboard container not found");
    return;
  }

  keyboardContainer.innerHTML = "";

  keys.forEach((key) => {
    const keyButton = document.createElement("button");
    keyButton.className = "keyboard-key";
    keyButton.textContent = key;
    keyboardContainer.appendChild(keyButton);
  });
}

export function updateGameUI(data) {
  if (data.hiddenWord) {
    document.querySelector(".hidden-word").textContent = data.hiddenWord
      .split("")
      .join(" ");
  }
  if (data.meaning) {
    document.getElementById(
      "meaningBox"
    ).textContent = `Meaning: ${data.meaning}`;
  }
}

export function updateScoreboard(score) {
  document.getElementById("scoreboard").textContent = `Score: ${score}`;
}

export function showMessage(message) {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  setTimeout(() => {
    messageBox.textContent = "";
  }, 3000);
}
