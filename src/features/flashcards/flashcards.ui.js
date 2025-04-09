import { LANGUAGES } from "./flashcards.constants.js";
import { LANGUAGE_VOICES } from "./flashcards.constants.js";

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

  const themeToggle = document.createElement("div");
  themeToggle.className = "theme-switch";
  themeToggle.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle" title="Toggle dark mode">
      ${localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  app.appendChild(themeToggle);

  const flashcardsContainer = document.createElement("div");
  flashcardsContainer.className = "flashcards";

  const title = document.createElement("h2");
  title.innerHTML = '<i class="fas fa-clone"></i> Flashcards';
  flashcardsContainer.appendChild(title);

  const backButton = document.createElement("a");
  backButton.id = "back-to-home";
  backButton.className = "back-btn";
  backButton.href = "index.html";
  backButton.innerHTML = "⬅ Back to Home";
  flashcardsContainer.appendChild(backButton);

  const languageLabel = document.createElement("label");
  languageLabel.setAttribute("for", "language-selector");
  languageLabel.textContent = "Choose Language:";
  flashcardsContainer.appendChild(languageLabel);

  const languageSelector = document.createElement("select");
  languageSelector.id = "language-selector";
  LANGUAGES.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.value;
    option.textContent = lang.text;
    option.selected = lang.value === selectedLanguage;
    languageSelector.appendChild(option);
  });
  flashcardsContainer.appendChild(languageSelector);

  const loadingMessage = document.createElement("div");
  loadingMessage.id = "loading-message";
  loadingMessage.className = "loading-message";
  loadingMessage.textContent = "Please select a language to load flashcards.";
  flashcardsContainer.appendChild(loadingMessage);

  const flashcardsContent = document.createElement("div");
  flashcardsContent.id = "flashcards-container";
  flashcardsContent.className = "flashcard-container";
  flashcardsContainer.appendChild(flashcardsContent);

  const navigationButtons = document.createElement("div");
  navigationButtons.className = "navigation-buttons";
  navigationButtons.innerHTML = `
    <button id="previous-btn" class="prev-btn">Previous</button>
    <button id="next-btn" class="next-btn">Next</button>
  `;
  flashcardsContainer.appendChild(navigationButtons);

  app.appendChild(flashcardsContainer);
}

export function renderFlashcards(flashcards) {
  const container = document.getElementById("flashcards-container");
  container.innerHTML = "";

  if (!flashcards.length) {
    container.innerHTML = "<p>No flashcards found</p>";
    return;
  }

  flashcards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "flashcard";
    cardElement.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="word">${card.word}</div>
        </div>
        <div class="flashcard-back">
          <div class="translation">${card.translation}</div>
          <button class="speak-btn">🔊</button>
        </div>
      </div>
    `;

    cardElement.addEventListener("click", () => {
      cardElement.classList.toggle("flipped");
    });

    cardElement.querySelector(".speak-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      speakWord(card.translation, selectedLanguage);
    });

    container.appendChild(cardElement);
  });
}

export function updateNavigation(currentPage) {
  const prevBtn = document.getElementById("previous-btn");
  prevBtn.style.display = currentPage > 1 ? "block" : "none";
}

export function showLoading(show) {
  const loadingMessage = document.getElementById("loading-message");
  if (loadingMessage) {
    loadingMessage.style.display = show ? "block" : "none";
  }
}

function speakWord(word, lang) {
  if (!LANGUAGE_VOICES[lang]) {
    console.warn(`Language "${lang}" not supported for speech`);
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = LANGUAGE_VOICES[lang];

  const voices = speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang === LANGUAGE_VOICES[lang]);

  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}
