import { showConfirmationModal, showMessage, showError } from "../auth.ui.js";
import { updateUser, deleteUser, deleteLog } from "./admin.api.js";

export function setupAdminEventListeners() {
  document
    .getElementById("back-to-home-button")
    ?.addEventListener("click", () => {
      window.location.href = "index.html";
    });

  document
    .getElementById("update-form")
    ?.addEventListener("submit", handleUpdateUser);

  document
    .getElementById("delete-form")
    ?.addEventListener("submit", handleDeleteUser);
}

export async function handleUpdateUser(e) {
  e.preventDefault();
  const userId = document.getElementById("userId").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const token = localStorage.getItem("token");

  if (!userId || !username || !email) {
    await showError("All fields are required");
    return;
  }

  const confirmed = await showConfirmationModal({
    title: "Update User",
    message: `Are you sure you want to update user ${username} (${email}) to role ${role}?`,
    confirmText: "Update",
    cancelText: "Cancel",
  });

  if (!confirmed) return;

  try {
    await updateUser(userId, { username, email, role }, token);
    await showMessage("User updated successfully");
    document.getElementById("update-form").reset();
    window.location.reload();
  } catch (error) {
    console.error("Error updating user:", error);
    await showError(error.message || "Failed to update user");
  }
}

export async function handleDeleteUser(e) {
  e.preventDefault();
  const userId = document.getElementById("deleteUserId").value.trim();
  const token = localStorage.getItem("token");
  const cleanUserId = userId.replace(/^ID:\s*/i, "");

  if (!userId) {
    await showError("User ID is required");
    return;
  }

  const confirmed = await showConfirmationModal({
    title: "Delete User",
    message: "Are you sure you want to permanently delete this user?",
    confirmText: "Delete",
    danger: true,
    cancelText: "Cancel",
  });

  if (!confirmed) return;

  try {
    await deleteUser(cleanUserId, token);
    await showMessage("User deleted successfully");
    document.getElementById("delete-form").reset();
    window.location.reload();
  } catch (error) {
    console.error("Error deleting user:", error);
    await showError(error.message || "Failed to delete user");
  }
}

export async function handleDeleteLog(logId) {
  const token = localStorage.getItem("token");
  const confirmed = await showConfirmationModal({
    title: "Delete Log",
    message: "Are you sure you want to delete this login log?",
    confirmText: "Delete",
    danger: true,
    cancelText: "Cancel",
  });

  if (confirmed) {
    try {
      await deleteLog(logId, token);
      await showMessage("Log deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting log:", error);
      await showError("Failed to delete log");
    }
  }
}
