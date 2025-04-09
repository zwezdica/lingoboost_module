import {
  createHeader,
  createIntroSection,
  createLanguageSelector,
  createAnimationImage,
  createLoginForm,
  createTestimonialsSection,
  createVideoLessonsSection,
  createContactForm,
  createFooter,
} from "./home.ui.js";
import { setupTheme, checkAuthState } from "./home.utils.js";
import { setupEventListeners } from "./home.events.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  emailjs.init("LEzidInbrwbSSGvkt");

  createHeader(app);
  setupTheme();
  createIntroSection(app);
  createLanguageSelector(app);
  createAnimationImage(app);
  createLoginForm(app);
  createTestimonialsSection(app);
  createVideoLessonsSection(app);
  createContactForm(app);
  createFooter(app);

  checkAuthState();
  setupEventListeners();
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.createElement("div");
  backToTopButton.className = "back-to-top";
  backToTopButton.innerHTML = "↑";
  document.body.appendChild(backToTopButton);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
