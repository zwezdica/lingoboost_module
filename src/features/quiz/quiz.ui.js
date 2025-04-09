import { LANGUAGES } from "./quiz.constants.js";
import {
  getGameState,
  getCurrentQuestion,
  isQuizComplete,
} from "./quiz.game.js";
import { getLocalStorage } from "./quiz.utils.js";

export const initializeUI = () => {
  const app = document.getElementById("quiz-container");
  app.innerHTML = createQuizHTML();
  setupLanguageSelector();
  createThemeToggle();
};

const createQuizHTML = () => {
  return `
    <div class="quiz-content">
      <h2><i class="fas fa-question-circle"></i> Language Quiz</h2>
      <a href="index.html" class="back-btn">⬅ Back to Home</a>

      <div id="scoreboard">
        <span id="correct-score">Correct: 0</span> | 
        <span id="incorrect-score">Incorrect: 0</span>
      </div>

      <label for="language-selector">Choose Language:</label>
      <select id="language-selector"></select>
      <button id="start-quiz-btn">Start quiz</button>

      <div class="question-box" id="question-container"></div>
      <div class="options" id="options-container"></div>

      <div class="buttons">
        <button class="prev-btn" id="prev-btn" style="display: none">Previous</button>
        <div id="gif-container"></div>
        <button class="next-btn" id="next-btn" style="display: none">Next</button>
      </div>
    </div>
  `;
};

const setupLanguageSelector = () => {
  const selector = document.getElementById("language-selector");
  LANGUAGES.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.value;
    option.textContent = lang.text;
    selector.appendChild(option);
  });
  selector.value = getLocalStorage("selectedLanguage") || "fr";
};

export const createThemeToggle = () => {
  const themeToggle = document.createElement("div");
  themeToggle.className = "theme-switch";
  themeToggle.innerHTML = `
    <input type="checkbox" id="theme-toggle">
    <label for="theme-toggle">
      ${getLocalStorage("theme") === "dark" ? "☀️" : "🌙"}
    </label>
  `;
  document.body.appendChild(themeToggle);
};

export const renderQuestion = () => {
  if (isQuizComplete()) {
    showQuizCompletion();
    return;
  }

  const question = getCurrentQuestion();
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  questionContainer.textContent = question.question;
  optionsContainer.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    optionsContainer.appendChild(button);
  });

  updateNavigationButtons();
};

export const updateNavigationButtons = () => {
  const { currentQuestionIndex, questions } = getGameState();
  document.getElementById("next-btn").style.display =
    currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
  document.getElementById("prev-btn").style.display =
    currentQuestionIndex > 0 ? "inline-block" : "none";
};

export const updateScoreboard = () => {
  const { correctAnswers, currentQuestionIndex } = getGameState();
  document.getElementById(
    "correct-score"
  ).textContent = `Correct: ${correctAnswers}`;
  document.getElementById("incorrect-score").textContent = `Incorrect: ${
    currentQuestionIndex - correctAnswers
  }`;
};

export const showQuizCompletion = () => {
  const { correctAnswers, totalQuestions } = getGameState();
  document.getElementById(
    "question-container"
  ).textContent = `Quiz completed! Final score: ${correctAnswers} / ${totalQuestions}`;
  document.getElementById("options-container").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("prev-btn").style.display = "none";
};

export const showFeedback = (isCorrect) => {
  const gifContainer = document.getElementById("gif-container");
  gifContainer.innerHTML = `
    <img src="./img/${isCorrect ? "correct" : "wrongAn"}.gif" 
         alt="${isCorrect ? "Correct" : "Wrong"}">
  `;
};

export const showError = (message) => {
  document.getElementById("question-container").textContent = message;
};
