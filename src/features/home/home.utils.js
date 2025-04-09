export function setupTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleIcon(savedTheme);
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggleIcon(newTheme);
}

function updateThemeToggleIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

  themeToggle.title =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

export function checkAuthState() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "user";
  const username = localStorage.getItem("username") || "User";

  if (token) {
    showLoggedInUI(role, username);
  } else {
    showLoginUI();
  }
}

export function showLoggedInUI(role, username) {
  const displayRole = role || "user";
  const displayUsername = username || "User";

  const loginForm = document.getElementById("loginForm");
  const registerBtn = document.getElementById("registerBtn");
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const usernameElement = document.getElementById("username");
  const adminLink = document.getElementById("adminLink");
  const languageSelector = document.getElementById("languageSelectorContainer");

  if (loginForm) loginForm.style.display = "none";
  if (registerBtn) registerBtn.style.display = "none";
  if (userInfo) userInfo.style.display = "block";
  if (logoutBtn) logoutBtn.style.display = "block";
  if (languageSelector) languageSelector.style.display = "block";

  if (usernameElement) usernameElement.textContent = displayUsername;

  if (adminLink) {
    adminLink.style.display = displayRole === "admin" ? "inline-block" : "none";
  }
}

export function showLoginUI() {
  const loginForm = document.getElementById("loginForm");
  const registerBtn = document.getElementById("registerBtn");
  const userInfo = document.getElementById("userInfo");
  const logoutBtn = document.getElementById("logoutBtn");
  const adminLink = document.getElementById("adminLink");
  const languageSelector = document.getElementById("languageSelectorContainer");

  if (loginForm) loginForm.style.display = "block";
  if (registerBtn) registerBtn.style.display = "block";
  if (userInfo) userInfo.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "none";
  if (adminLink) adminLink.style.display = "none";
  if (languageSelector) languageSelector.style.display = "none";
}
