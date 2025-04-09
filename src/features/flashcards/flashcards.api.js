import { API_URL } from "./flashcards.constants.js";
import {
  renderFlashcards,
  showLoading,
  updateNavigation,
} from "./flashcards.ui.js";
import { getCurrentPage, getSelectedLanguage } from "./flashcards.events.js";

export async function fetchFlashcards() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    showLoading(true);

    const response = await fetch(
      `${API_URL}/${getSelectedLanguage()}?page=${getCurrentPage()}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error loading flashcards");
    }

    const data = await response.json();
    showLoading(false);
    renderFlashcards(data.flashcards || []);
    updateNavigation(getCurrentPage());
  } catch (error) {
    console.error("Fetch error:", error);
    showLoading(false);
  }
}
