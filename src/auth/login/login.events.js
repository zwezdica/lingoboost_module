import { loginUser } from "./login.api.js";
import { storeUserData, redirectAfterLogin } from "../auth.events.js";
import { showError } from "../auth.ui.js";

export function setupLoginEventListeners() {
  document
    .getElementById("login-form")
    ?.addEventListener("submit", handleLogin);
  document
    .getElementById("register-link")
    ?.addEventListener("click", handleRegisterClick);
}

export async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const data = await loginUser({ username, password });
    storeUserData(data);
    redirectAfterLogin();
  } catch (error) {
    showError(error.message || "An error occurred. Please try again.");
  }
}

export function handleRegisterClick(e) {
  e.preventDefault();
  sessionStorage.setItem("redirectAfterRegister", window.location.pathname);
  window.location.href = "register.html";
}
