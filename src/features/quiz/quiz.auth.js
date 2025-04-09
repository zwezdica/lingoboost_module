import { getLocalStorage } from "./quiz.api.js";

export const checkAuthStatus = () => {
  const token = getLocalStorage("token");
  if (!token) {
    alert("You must be logged in to play.");
    window.location.href = "login.html";
  }
};
