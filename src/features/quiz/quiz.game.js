import { fetchQuizQuestions } from "./quiz.api.js";
import { DEFAULT_STATE } from "./quiz.constants.js";
import { updateScoreboard, showQuizCompletion } from "./quiz.ui.js";

let state = { ...DEFAULT_STATE };

export const initializeQuiz = () => {
  state = { ...DEFAULT_STATE };
  state.selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";
};

export const startQuiz = async () => {
  try {
    const questions = await fetchQuizQuestions(state.selectedLanguage);
    state.questions = questions.filter(
      (q) => q.language === state.selectedLanguage
    );
    state.totalQuestions = state.questions.length;
    state.currentQuestionIndex = 0;
    state.correctAnswers = 0;
    return true;
  } catch (error) {
    console.error("Quiz error:", error);
    return false;
  }
};

export const getCurrentQuestion = () => {
  return state.questions[state.currentQuestionIndex];
};

export const checkAnswer = (selectedOption) => {
  const isCorrect = selectedOption === getCurrentQuestion()?.answer;
  if (isCorrect) state.correctAnswers++;
  return isCorrect;
};

export const moveToNextQuestion = () => {
  if (state.currentQuestionIndex < state.questions.length - 1) {
    state.currentQuestionIndex++;
    return true;
  }
  return false;
};

export const moveToPreviousQuestion = () => {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex--;
    return true;
  }
  return false;
};

export const updateGameState = (newState) => {
  state = { ...state, ...newState };
};

export const getGameState = () => {
  return { ...state };
};

export const isQuizComplete = () => {
  return state.currentQuestionIndex >= state.questions.length;
};
