export const API_ENDPOINTS = {
  QUIZZES: "/api/quizzes",
};

export const LANGUAGES = [
  { value: "fr", text: "Français" },
  { value: "es", text: "Español" },
  { value: "de", text: "Deutsch" },
  { value: "it", text: "Italian" },
];

export const DEFAULT_STATE = {
  currentQuestionIndex: 0,
  questions: [],
  selectedLanguage: "fr",
  correctAnswers: 0,
  totalQuestions: 0,
};
