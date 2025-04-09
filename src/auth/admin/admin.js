import { fetchUsers, fetchLoginLogs } from "./admin.api.js";
import {
  setupAdminEventListeners,
  handleUpdateUser,
  handleDeleteUser,
  handleDeleteLog,
} from "./admin.events.js";
import {
  renderUsers,
  renderLogs,
  renderUserPagination,
  renderLogPagination,
} from "./admin.ui.js";
import { initializeDarkMode, toggleTheme } from "../auth.ui.js";

let currentUserPage = 1;
let currentLogPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  initializeAdminPanel();
  initializeDarkMode();
  setupAdminEventListeners();
  window.fetchUsers = fetchAndRenderUsers;
  window.fetchLoginLogs = fetchAndRenderLogs;
  window.handleDeleteLog = handleDeleteLog;
  fetchAndRenderUsers(currentUserPage);
  fetchAndRenderLogs(currentLogPage);
});

function initializeAdminPanel() {
  const app = document.getElementById("app") || document.body;

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";
  iconContainer.innerHTML = `
     <svg viewBox="0 0 24 24" width="24" height="24">
       <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
     </svg>
  `;
  iconContainer.style.display = "none";
  app.appendChild(iconContainer);

  app.innerHTML = `
    <div class="container">
      <h1>Admin Panel</h1>
      <button id="back-to-home-button">Back to Home</button>
      <section id="users-container">
        <h2>User List</h2>
        <div id="users"></div>
        <div id="user-pagination" class="pagination-container"></div>
      </section>
      <section id="logs-container">
        <h2>Login Logs</h2>
        <div id="logs"></div>
        <div id="log-pagination" class="pagination-container"></div>
      </section>
      <section id="update-user">
        <h2>Update User</h2>
        <form id="update-form">
          <input type="text" id="userId" placeholder="User ID" required />
          <input type="text" id="username" placeholder="Username" required />
          <input type="email" id="email" placeholder="Email" required />
          <select id="role" required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Update User</button>
        </form>
      </section>
      <section id="delete-user">
        <h2>Delete User</h2>
        <form id="delete-form">
          <input type="text" id="deleteUserId" placeholder="User ID" required />
          <button type="submit">Delete User</button>
        </form>
      </section>
    </div>
  `;
}

async function fetchAndRenderUsers(page = 1) {
  try {
    const token = localStorage.getItem("token");
    const data = await fetchUsers(page, token);
    const users = data.users || data.data || [];
    const totalUsers = data.total || data.totalUsers || 0;
    const totalPages = data.totalPages || Math.ceil(totalUsers / 6);

    currentUserPage = page;
    renderUsers(users);
    renderUserPagination(currentUserPage, totalPages);
  } catch (error) {
    console.error("Error fetching users:", error);
    showError("Failed to load users. Please try again.");
  }
}

async function fetchAndRenderLogs(page = 1) {
  try {
    const token = localStorage.getItem("token");
    const data = await fetchLoginLogs(page, token);
    const logs = data.logs || data.data || [];
    const totalLogs = data.total || data.totalLogs || 0;
    const totalPages = data.totalPages || Math.ceil(totalLogs / 6);

    currentLogPage = page;
    renderLogs(logs);
    renderLogPagination(currentLogPage, totalPages);
  } catch (error) {
    console.error("Error fetching logs:", error);
    showError("Failed to load logs. Please try again.");
  }
}
