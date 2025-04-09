import { registerUser } from "./register.api.js";
import { showError } from "../auth.ui.js";

export function setupRegisterEventListeners() {
  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", handleThemeToggle);
  document
    .getElementById("register-form")
    ?.addEventListener("submit", handleRegisterSubmit);
  document
    .getElementById("reg-password")
    ?.addEventListener("input", validatePassword);
}

export function handleThemeToggle() {
  const isDarkMode = document.getElementById("theme-toggle").checked;
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode ? "dark" : "light"
  );
}

export function validatePassword() {
  const password = document.getElementById("reg-password").value;
  const requirements = checkPasswordRequirements(password);
  updatePasswordUI(requirements);
  updateSubmitButton(requirements);
}

export function checkPasswordRequirements(password) {
  const SPECIAL_CHARS = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?".split("");
  const escapedSpecialChars = SPECIAL_CHARS.map((char) => {
    if (/[-\/\\^$*+?.()|[\]{}]/.test(char)) {
      return `\\${char}`;
    }
    return char;
  }).join("");

  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: new RegExp(`[${escapedSpecialChars}]`).test(password),
  };
}

function updatePasswordUI(requirements) {
  for (const [key, met] of Object.entries(requirements)) {
    const element = document.getElementById(`req-${key}`);
    if (element) {
      element.classList.toggle("met", met);
    }
  }
}

function updateSubmitButton(requirements) {
  const registerButton = document.getElementById("register-button");
  if (registerButton) {
    registerButton.disabled = !Object.values(requirements).every(Boolean);
  }
}

export async function handleRegisterSubmit(e) {
  e.preventDefault();

  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!validateForm(username, email, password)) return;

  try {
    await registerUser({ username, email, password });
    showRegistrationSuccess();
  } catch (error) {
    showRegistrationError(
      error.message || "An error occurred. Please try again."
    );
  }
}

function validateForm(username, email, password) {
  if (username.length < 3) {
    alert("Username must be at least 3 characters long");
    return false;
  }

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  const passwordRequirements = checkPasswordRequirements(password);
  if (!Object.values(passwordRequirements).every(Boolean)) {
    alert("Password does not meet all requirements");
    return false;
  }

  return true;
}

function showRegistrationSuccess() {
  alert("Registration successful! You can now login.");
  window.location.href = "login.html";
}

function showRegistrationError(message) {
  alert(message);
  document.getElementById("reg-password").value = "";
  validatePassword();
}
