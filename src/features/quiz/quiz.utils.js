export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const initializeDarkMode = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  const savedTheme = getLocalStorage("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDarkMode =
    savedTheme === "dark" || (!savedTheme && systemPrefersDark);

  themeToggle.checked = isDarkMode;
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeLabel.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeLabel.textContent = "🌙";
  }
};

export const checkAuthentication = () => {
  if (!getLocalStorage("token")) {
    alert("You must be logged in to play.");
    window.location.href = "login.html";
  }
};
