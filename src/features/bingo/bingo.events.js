import { toggleTheme } from "./bingo.utils.js";
import { startGame, handleTranslationSubmit } from "./bingo.game.js";

export function setupEventListeners() {
  document.getElementById("start-button")?.addEventListener("click", startGame);
  document.getElementById("back-to-home")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document.getElementById("close-modal")?.addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });
  document
    .getElementById("close-translation-modal")
    ?.addEventListener("click", () => {
      document.getElementById("translation-modal").style.display = "none";
    });

  document
    .getElementById("translation-input")
    ?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleTranslationSubmit();
      }
    });

  document
    .getElementById("submit-translation")
    ?.addEventListener("click", handleTranslationSubmit);

  document
    .getElementById("theme-toggle")
    ?.addEventListener("change", toggleTheme);

  document
    .getElementById("language-selector")
    ?.addEventListener("change", (e) => {
      localStorage.setItem("selectedLanguage", e.target.value);
    });

  window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
    if (event.target === document.getElementById("translation-modal")) {
      document.getElementById("translation-modal").style.display = "none";
    }
  });
}
