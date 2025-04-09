import {
  initializeQuiz,
  startQuiz,
  checkAnswer,
  moveToNextQuestion,
  moveToPreviousQuestion,
  updateGameState,
} from "./quiz.game.js";
import {
  renderQuestion,
  updateScoreboard,
  showFeedback,
  showError,
} from "./quiz.ui.js";
import { setLocalStorage } from "./quiz.utils.js";

export const setupEventListeners = () => {
  document
    .getElementById("start-quiz-btn")
    ?.addEventListener("click", handleStartQuiz);
  document
    .getElementById("language-selector")
    ?.addEventListener("change", handleLanguageChange);
  document
    .getElementById("next-btn")
    ?.addEventListener("click", handleNextQuestion);
  document
    .getElementById("prev-btn")
    ?.addEventListener("click", handlePreviousQuestion);
  document
    .getElementById("options-container")
    ?.addEventListener("click", handleOptionSelect);
  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);
};

const handleStartQuiz = async () => {
  initializeQuiz();
  const success = await startQuiz();
  if (success) {
    renderQuestion();
    updateScoreboard();
  } else {
    showError("Failed to load quiz. Please try again.");
  }
};

const handleLanguageChange = (e) => {
  const language = e.target.value;
  setLocalStorage("selectedLanguage", language);
  updateGameState({ selectedLanguage: language });
};

const handleNextQuestion = () => {
  if (moveToNextQuestion()) {
    renderQuestion();
    updateScoreboard();
  }
};

const handlePreviousQuestion = () => {
  if (moveToPreviousQuestion()) {
    renderQuestion();
    updateScoreboard();
  }
};

const handleOptionSelect = (e) => {
  if (e.target.classList.contains("option-btn")) {
    const isCorrect = checkAnswer(e.target.textContent);
    showFeedback(isCorrect);
    updateScoreboard();
    document.getElementById("next-btn").style.display = "inline-block";
  }
};

export const toggleTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    setLocalStorage("theme", "dark");
    themeLabel.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    setLocalStorage("theme", "light");
    themeLabel.textContent = "🌙";
  }
};
