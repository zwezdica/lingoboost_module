import { fetchWords } from "./dragdrops.api.js";
import { setLocalStorage } from "./dragdrops.utils.js";
import { displayWords, updateScoreboard } from "./dragdrops.ui.js";
import { WORDS_PER_PAGE } from "./dragdrops.constants.js";

let words = [];
let draggedWord = null;
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

export const setupEventListeners = () => {
  document
    .getElementById("languageDropdown")
    ?.addEventListener("change", async (e) => {
      setLocalStorage("selectedLanguage", e.target.value);
      await initializeGame(e.target.value);
    });

  document
    .getElementById("prevButton")
    ?.addEventListener("click", showPreviousWords);
  document
    .getElementById("nextButton")
    ?.addEventListener("click", showNextWords);
  document.getElementById("backToHome")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);

  document.addEventListener("dragstart", handleDragStart);
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", handleDrop);
};

export const initializeGame = async (language) => {
  try {
    words = await fetchWords(language);
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    displayWords(words, currentIndex);
    updateScoreboard(correctCount, incorrectCount);
  } catch (error) {
    console.error("Game initialization error:", error);
    document.getElementById(
      "words-container"
    ).innerHTML = `<p class="error">Error loading words: ${error.message}</p>`;
  }
};

const handleDragStart = (e) => {
  if (e.target.classList.contains("word-card")) {
    draggedWord = e.target;
    e.dataTransfer.setData("text/plain", e.target.textContent);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  if (!draggedWord) return;

  const translationCard = e.target.closest(".icon-card");
  if (!translationCard) return;

  const isCorrect =
    translationCard.dataset.translation === draggedWord.textContent.trim();

  if (isCorrect) {
    correctCount++;
    handleCorrectMatch(translationCard, draggedWord);
  } else {
    incorrectCount++;
    handleIncorrectMatch(translationCard, draggedWord);
  }

  updateScoreboard(correctCount, incorrectCount);
  draggedWord = null;
};

const handleCorrectMatch = (translationCard, wordCard) => {
  translationCard.style.backgroundColor = "#036932";
  wordCard.style.backgroundColor = "#036932";
  wordCard.setAttribute("draggable", "false");
  translationCard.classList.add("matched");
  translationCard.ondragover = null;
  translationCard.ondrop = null;
};

const handleIncorrectMatch = (translationCard, wordCard) => {
  translationCard.style.backgroundColor = "#f50000";
  wordCard.style.backgroundColor = "#f50000";
  setTimeout(() => {
    translationCard.style.backgroundColor = "";
    wordCard.style.backgroundColor = "";
  }, 1000);
};

const showNextWords = () => {
  if (currentIndex + WORDS_PER_PAGE < words.length) {
    currentIndex += WORDS_PER_PAGE;
    displayWords(words, currentIndex);
  }
};

const showPreviousWords = () => {
  if (currentIndex > 0) {
    currentIndex -= WORDS_PER_PAGE;
    displayWords(words, currentIndex);
  }
};

const toggleTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

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
