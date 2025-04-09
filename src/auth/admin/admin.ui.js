export function renderUsers(users) {
  const usersContainer = document.getElementById("users");
  usersContainer.innerHTML =
    users.length > 0
      ? users
          .map(
            (user) => `
        <div class="user">
          <p><strong>ID:</strong> ${user._id}</p>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Role:</strong> ${user.role}</p>
        </div>
      `
          )
          .join("")
      : "<p>No users found</p>";
}

export function renderLogs(logs) {
  const logsContainer = document.getElementById("logs");
  logsContainer.innerHTML =
    logs.length > 0
      ? logs
          .map(
            (log) => `
        <div class="log">
          <p><strong>Username:</strong> ${log.username}</p>
          <p><strong>Timestamp:</strong> ${new Date(
            log.timestamp
          ).toLocaleString()}</p>
          <button class="delete-log-button" data-log-id="${
            log._id
          }">Delete</button>
        </div>
      `
          )
          .join("")
      : "<p>No logs found</p>";

  document.querySelectorAll(".delete-log-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const logId = e.target.getAttribute("data-log-id");
      window.handleDeleteLog(logId);
    });
  });
}

export function renderUserPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById("user-pagination");
  currentPage = Math.min(Math.max(1, currentPage), totalPages);

  paginationContainer.innerHTML =
    totalPages > 1
      ? `
      <div class="pagination-controls">
        <button id="prev-user" ${currentPage <= 1 ? "disabled" : ""}>
          Previous
        </button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button id="next-user" ${currentPage >= totalPages ? "disabled" : ""}>
          Next
        </button>
      </div>
    `
      : "";

  document.getElementById("prev-user")?.addEventListener("click", () => {
    window.fetchUsers(currentPage - 1);
  });

  document.getElementById("next-user")?.addEventListener("click", () => {
    window.fetchUsers(currentPage + 1);
  });
}

export function renderLogPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById("log-pagination");
  currentPage = Math.min(Math.max(1, currentPage), totalPages);

  paginationContainer.innerHTML =
    totalPages > 1
      ? `
      <div class="pagination-controls">
        <button id="prev-log" ${currentPage <= 1 ? "disabled" : ""}>
          Previous
        </button>
        <span>Page ${currentPage} of ${totalPages}</span>
        <button id="next-log" ${currentPage >= totalPages ? "disabled" : ""}>
          Next
        </button>
      </div>
    `
      : "";

  document.getElementById("prev-log")?.addEventListener("click", () => {
    window.fetchLoginLogs(currentPage - 1);
  });

  document.getElementById("next-log")?.addEventListener("click", () => {
    window.fetchLoginLogs(currentPage + 1);
  });
}
