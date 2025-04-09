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

  const isDarkMode =
    getLocalStorage("theme") === "dark" ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !getLocalStorage("theme"));

  themeToggle.checked = isDarkMode;
  themeLabel.innerHTML = isDarkMode ? "☀️" : "🌙";

  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
};
