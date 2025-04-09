import { toggleTheme } from "./home.utils.js";
import { handleLogin, handleLogout, handleContactSubmit } from "./home.api.js";

export function setupEventListeners() {
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);
  document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
  document.getElementById("registerBtn")?.addEventListener("click", () => {
    window.location.href = "register.html";
  });
  document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);
  document
    .getElementById("contactForm")
    ?.addEventListener("submit", handleContactSubmit);
  document.getElementById("closeModal")?.addEventListener("click", () => {
    document.getElementById("successModal").style.display = "none";
  });

  document
    .getElementById("languageSelector")
    ?.addEventListener("change", (e) => {
      localStorage.setItem("selectedLanguage", e.target.value);
    });
}

export function initCarousel(carouselElement) {
  const container = carouselElement.querySelector(".carousel-container");
  const slides = carouselElement.querySelectorAll(".testimonial-slide");
  const dotsContainer = carouselElement.querySelector(".carousel-dots");
  const prevBtn = carouselElement.querySelector(".carousel-prev");
  const nextBtn = carouselElement.querySelector(".carousel-next");

  let currentIndex = 0;
  let interval;

  function createDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `dot ${index === 0 ? "active" : ""}`;
      dot.dataset.index = index;
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlide(newIndex) {
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    slides[currentIndex].classList.remove("active");
    dotsContainer.querySelector(".dot.active")?.classList.remove("active");

    currentIndex = newIndex;
    slides[currentIndex].classList.add("active");
    dotsContainer
      .querySelector(`.dot[data-index="${currentIndex}"]`)
      .classList.add("active");
  }

  function setupEventListeners() {
    prevBtn.addEventListener("click", () => {
      resetInterval();
      updateSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      resetInterval();
      updateSlide(currentIndex + 1);
    });

    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        resetInterval();
        updateSlide(parseInt(e.target.dataset.index));
      }
    });

    let touchStartX = 0;
    container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        resetInterval();
      },
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (diff > 50) updateSlide(currentIndex + 1);
        else if (diff < -50) updateSlide(currentIndex - 1);
        startInterval();
      },
      { passive: true }
    );

    carouselElement.addEventListener("mouseenter", resetInterval);
    carouselElement.addEventListener("mouseleave", startInterval);
  }

  function startInterval() {
    interval = setInterval(() => updateSlide(currentIndex + 1), 5000);
  }

  function resetInterval() {
    clearInterval(interval);
  }

  createDots();
  setupEventListeners();
  startInterval();
}
