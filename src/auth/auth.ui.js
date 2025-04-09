let activeModals = [];

export function showConfirmationModal(options) {
  closeAllModals();

  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3 class="modal-title">${options.title}</h3>
        <p class="modal-message">${options.message}</p>
        <div class="modal-buttons">
          <button id="modal-cancel" class="modal-button modal-button-cancel">${
            options.cancelText || "Cancel"
          }</button>
          <button id="modal-confirm" class="modal-button ${
            options.danger ? "modal-button-danger" : "modal-button-confirm"
          }">
            ${options.confirmText || "Confirm"}
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    activeModals.push(modal);

    setTimeout(() => modal.classList.add("active"), 10);

    const confirmBtn = document.getElementById("modal-confirm");
    const cancelBtn = document.getElementById("modal-cancel");

    const cleanup = () => {
      modal.classList.remove("active");
      setTimeout(() => {
        if (modal.parentNode === document.body) {
          document.body.removeChild(modal);
        }
        activeModals = activeModals.filter((m) => m !== modal);
      }, 300);
    };

    const handleConfirm = () => {
      confirmBtn.removeEventListener("click", handleConfirm);
      cancelBtn.removeEventListener("click", handleCancel);
      cleanup();
      resolve(true);
    };

    const handleCancel = () => {
      confirmBtn.removeEventListener("click", handleConfirm);
      cancelBtn.removeEventListener("click", handleCancel);
      cleanup();
      resolve(false);
    };

    confirmBtn.addEventListener("click", handleConfirm);
    cancelBtn.addEventListener("click", handleCancel);
  });
}

export function showNotificationModal(options) {
  closeAllModals();

  return new Promise((resolve) => {
    const modal = document.createElement("div");
    const iconContainer = document.createElement("div");
    iconContainer.className = "modal-icon";
    iconContainer.innerHTML = `
    <svg viewBox="0 0 24 24" width="40" height="40">
        <rect width="24" height="24" fill="transparent"/>
        <path fill="transparent" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
    `;
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content ${options.type || "info"}">
        ${iconContainer.outerHTML}
        <h3 class="modal-title">${options.title}</h3>
        <p class="modal-message">${options.message}</p>
        <div class="modal-buttons">
          <button id="modal-ok" class="modal-button modal-button-confirm">
            ${options.okText || "OK"}
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    activeModals.push(modal);

    setTimeout(() => modal.classList.add("active"), 10);

    const okBtn = document.getElementById("modal-ok");

    const cleanup = () => {
      modal.classList.remove("active");
      setTimeout(() => {
        if (modal.parentNode === document.body) {
          document.body.removeChild(modal);
        }
        activeModals = activeModals.filter((m) => m !== modal);
      }, 300);
    };

    const handleOk = () => {
      okBtn.removeEventListener("click", handleOk);
      cleanup();
      resolve(true);
    };

    okBtn.addEventListener("click", handleOk);

    if (options.autoClose) {
      setTimeout(() => {
        cleanup();
        resolve(true);
      }, options.autoClose);
    }
  });
}

export function closeAllModals() {
  activeModals.forEach((modal) => {
    modal.classList.remove("active");
    if (modal.parentNode === document.body) {
      document.body.removeChild(modal);
    }
  });
  activeModals = [];
}

export function showMessage(message) {
  return showNotificationModal({
    title: "Success",
    message: message,
    type: "success",
    okText: "OK",
    autoClose: 3000,
  });
}

export function showError(message) {
  return showNotificationModal({
    title: "Error",
    message: message,
    type: "error",
    okText: "OK",
  });
}

export function initializeDarkMode() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const isDarkMode = savedTheme ? savedTheme === "dark" : systemPrefersDark;

  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode ? "dark" : "light"
  );

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.checked = isDarkMode;
  }
}

export function toggleTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = "🌙";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = "☀️";
  }
}
