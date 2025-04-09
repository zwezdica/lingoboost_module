export function initializeDarkMode() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  const isDarkMode =
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches &&
      !localStorage.getItem("theme"));

  if (isDarkMode) {
    themeToggle.checked = true;
    document.documentElement.setAttribute("data-theme", "dark");
    themeLabel.innerHTML = "☀️";
  }
}

export function toggleTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.querySelector(".theme-switch label");

  if (!themeToggle || !themeLabel) return;

  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeLabel.innerHTML = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeLabel.innerHTML = "🌙";
  }
}
