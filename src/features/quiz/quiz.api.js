import { API_ENDPOINTS } from "./quiz.constants.js";

export const fetchQuizQuestions = async (language) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication required");

  const response = await fetch(`${API_ENDPOINTS.QUIZZES}/${language}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch questions");
  return await response.json();
};
