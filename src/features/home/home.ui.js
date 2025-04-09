import {
  NAV_ITEMS,
  LANGUAGES,
  TESTIMONIALS_DATA,
  VIDEO_DATA,
} from "./home.constants.js";
import { initCarousel } from "./home.events.js";

export function createHeader(parent) {
  const header = document.createElement("header");

  const themeToggle = document.createElement("button");
  themeToggle.id = "themeToggle";
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  header.appendChild(themeToggle);

  const logo = document.createElement("h1");
  logo.className = "logo";
  logo.innerHTML = '<i class="fas fa-comment"></i> LingoBoost';
  header.appendChild(logo);

  const nav = document.createElement("nav");
  const navList = document.createElement("ul");
  navList.className = "nav-list";

  NAV_ITEMS.forEach((item) => {
    const listItem = document.createElement("li");
    const navLink = document.createElement("a");
    navLink.href = item.href;

    const icon = document.createElement("i");
    icon.className = `fas ${item.icon}`;
    navLink.appendChild(icon);

    const text = document.createElement("span");
    text.textContent = item.text;
    navLink.appendChild(text);

    if (item.badge) {
      const badge = document.createElement("span");
      badge.className = "nav-badge";
      badge.textContent = item.badge;
      navLink.appendChild(badge);
    }

    listItem.appendChild(navLink);
    navList.appendChild(listItem);
  });

  nav.appendChild(navList);
  header.appendChild(nav);

  const userInfo = document.createElement("div");
  userInfo.className = "user-info";
  userInfo.id = "userInfo";
  userInfo.style.display = "none";
  userInfo.innerHTML = `
    <span id="username"></span>
    <button id="logoutBtn">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
    <a href="admin.html" id="adminLink" style="display: none;">
      <i class="fas fa-cogs"></i> Admin Panel
    </a>
  `;
  header.appendChild(userInfo);
  parent.appendChild(header);
}

export function createIntroSection(parent) {
  const intro = document.createElement("div");
  intro.className = "intro";
  intro.innerHTML = `
    <h2>Welcome to LingoBoost</h2>
    <p>Boost your vocabulary through interactive games that make learning addictive! LingoBoost turns language mastery into playtime with:
Drag & Drop puzzles • Bingo with words • Flashcards that stick •
Quiz challenges • Dictionary lookup • Guess Words brain teaser <br>
The fun way to learn – no textbooks needed!</p>
  `;
  parent.appendChild(intro);
}

export function createLanguageSelector(parent) {
  const languageContainer = document.createElement("div");
  languageContainer.className = "language-selector-container visible";
  languageContainer.id = "languageSelectorContainer";

  const languageIcon = document.createElement("div");
  languageIcon.className = "language-icon";
  languageIcon.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  `;
  languageContainer.appendChild(languageIcon);

  const label = document.createElement("label");
  label.textContent =
    "Choose your language for gaming and start learning the fun way!";
  label.htmlFor = "languageSelector";
  languageContainer.appendChild(label);

  const languageSelector = document.createElement("select");
  languageSelector.id = "languageSelector";
  languageSelector.className = "language-selector";

  const savedLanguage =
    localStorage.getItem("selectedLanguage") || LANGUAGES[0].value;

  LANGUAGES.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.value;
    option.textContent = lang.text;
    option.selected = lang.value === savedLanguage;
    languageSelector.appendChild(option);
  });

  languageContainer.appendChild(languageSelector);
  parent.appendChild(languageContainer);
}

export function createAnimationImage(parent) {
  const animationImg = document.createElement("img");
  animationImg.src = "./img/animation.gif";
  animationImg.alt = "animation";
  animationImg.className = "animation-image";
  parent.appendChild(animationImg);
}

export function createLoginForm(parent) {
  if (!document.getElementById("loginForm")) {
    const loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    loginForm.innerHTML = `
      <input type="text" id="loginUsername" placeholder="Username" required />
      <input type="password" id="loginPassword" placeholder="Password" required />
      <div class="form-buttons">
        <button type="submit">
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
        <span class="or-text">OR</span>
        <button type="button" id="registerBtn">
          <i class="fas fa-user-plus"></i> Register
        </button>
      </div>
    `;
    parent.appendChild(loginForm);
  }
}

export function createTestimonialsSection(parent) {
  const testimonialsSection = document.createElement("section");
  testimonialsSection.className = "testimonials";
  testimonialsSection.innerHTML = `
    <h2>What Our Users Say</h2>
    <div class="testimonial-carousel">
      <div class="carousel-container"></div>
      <div class="carousel-dots"></div>
      <button class="carousel-prev"><i class="fas fa-chevron-left"></i></button>
      <button class="carousel-next"><i class="fas fa-chevron-right"></i></button>
    </div>
  `;

  const carouselContainer = testimonialsSection.querySelector(
    ".carousel-container"
  );
  TESTIMONIALS_DATA.forEach((testimonial, index) => {
    const slide = document.createElement("div");
    slide.className = `testimonial-slide ${index === 0 ? "active" : ""}`;
    slide.innerHTML = `
      <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img">
      <p>"${testimonial.text}"</p>
      <span class="testimonial-author">- ${testimonial.name}</span>
    `;
    carouselContainer.appendChild(slide);
  });

  parent.appendChild(testimonialsSection);
  initCarousel(testimonialsSection.querySelector(".testimonial-carousel"));
}

export function createVideoLessonsSection(parent) {
  const videoLessons = document.createElement("section");
  videoLessons.className = "video-lessons";
  videoLessons.innerHTML = `
    <h2>Interactive Video Lessons</h2>
    <p>Learn languages through engaging video content</p>
    <div class="language-tabs">
      <div class="language-tab active" data-lang="all">All Languages</div>
      <div class="language-tab" data-lang="french">French</div>
      <div class="language-tab" data-lang="italian">Italian</div>
      <div class="language-tab" data-lang="german">German</div>
      <div class="language-tab" data-lang="spanish">Spanish</div>
    </div>
    <div class="video-grid"></div>
  `;

  const videoGrid = videoLessons.querySelector(".video-grid");
  VIDEO_DATA.forEach((video) => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.dataset.lang = video.lang;

    card.innerHTML = `
      <div class="video-container">
        <div class="video-placeholder" data-video-id="${video.id}">
          <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
          <button class="play-button"><i class="fas fa-play"></i></button>
        </div>
      </div>
      <div class="video-info">
        <h3>${video.title}</h3>
        <p>${video.desc}</p>
      </div>
    `;

    const placeholder = card.querySelector(".video-placeholder");
    placeholder.addEventListener("click", () => {
      placeholder.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${video.id}?autoplay=1" 
                title="${video.title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
      `;
    });

    videoGrid.appendChild(card);
  });

  const tabs = videoLessons.querySelectorAll(".language-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedLang = tab.dataset.lang;
      const videos = videoGrid.querySelectorAll(".video-card");

      videos.forEach((video) => {
        video.style.display =
          selectedLang === "all" || video.dataset.lang === selectedLang
            ? "block"
            : "none";
      });
    });
  });

  parent.appendChild(videoLessons);
}

export function createContactForm(parent) {
  const contactForm = document.createElement("form");
  contactForm.id = "contactForm";
  contactForm.innerHTML = `
    <h2>Contact Us</h2>
    <input type="text" id="contactName" placeholder="Your Name" required />
    <input type="email" id="contactEmail" placeholder="Your Email" required />
    <textarea id="contactMessage" placeholder="Your Message" required></textarea>
    <button type="submit">Send Message</button>

    <div id="successModal" class="modal" style="display: none;">  
      <div class="modal-content">
        <p>✅ Your message has been sent successfully!</p>
        <button id="closeModal">OK</button>
      </div>
    </div>
  `;
  parent.appendChild(contactForm);
}

export function createFooter(parent) {
  const footer = document.createElement("footer");
  footer.className = "main-footer";
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-logo">
        <i class="fas fa-comment"></i> LingoBoost
      </div>
      
      <div class="social-links">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="copyright">
        &copy; Copyright LingoBoost 2025. All rights reserved.
      </div>
    </div>
  `;
  parent.appendChild(footer);
}
