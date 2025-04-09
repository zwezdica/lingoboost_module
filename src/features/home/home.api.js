import { showLoggedInUI } from "./home.utils.js";

export async function handleLogin(e) {
  e.preventDefault();
  const usernameInput = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(
      "https://lingoboost-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role || "user");
    localStorage.setItem("username", data.username || usernameInput);

    showLoggedInUI(data.role, data.username || usernameInput);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message || "Login failed");
  }
}

export function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}

export function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;
  const modal = document.getElementById("successModal");

  emailjs
    .send("service_px1hwjy", "template_j9oo3or", {
      name: name,
      email: email,
      message: message,
    })
    .then(
      () => {
        modal.style.display = "flex";
        event.target.reset();
      },
      () => {
        alert("❌ Error sending message. Please try again.");
      }
    );
}
