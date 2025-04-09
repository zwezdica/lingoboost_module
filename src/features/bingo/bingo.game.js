import { fetchWords, checkTranslation } from "./bingo.api.js";
import { showModal } from "./bingo.ui.js";

let score = 0;
let currentWord = null;

export function generateBingoTable(words) {
  const bingoTable = document.getElementById("bingo-table");
  if (!bingoTable) return;

  bingoTable.innerHTML = "";
  const size = Math.sqrt(words.length);

  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      const word = words[i * size + j];
      cell.textContent = word.word;
      cell.dataset.wordId = word._id;
      cell.addEventListener("click", () => {
        currentWord = word;
        document.getElementById(
          "translation-modal-title"
        ).textContent = `Translate the word "${word.word}"`;
        document.getElementById("translation-input").value = "";
        document.getElementById("translation-modal").style.display = "block";
      });
      row.appendChild(cell);
    }
    bingoTable.appendChild(row);
  }
}

export async function startGame() {
  const level = document.getElementById("level-selector")?.value;
  const language = document.getElementById("language-selector")?.value;

  try {
    const { words } = await fetchWords(level, language);
    generateBingoTable(words);
  } catch (error) {
    console.error("An error occurred:", error);
    showModal(
      "Error",
      "An error occurred while loading words. Please try again."
    );
  }
}

export function updateScore(points) {
  score += points;
  document.getElementById("score").textContent = `Score: ${score}`;
}

export async function handleTranslationSubmit() {
  const translationInput = document.getElementById("translation-input");
  const userTranslation = translationInput?.value.trim();
  const language = document.getElementById("language-selector")?.value;

  if (!userTranslation) {
    showModal("Error", "Please enter a translation");
    return;
  }

  document.getElementById("translation-modal").style.display = "none";

  try {
    const result = await checkTranslation(
      currentWord._id,
      language,
      userTranslation
    );

    if (result.isCorrect) {
      showModal(
        "Correct!",
        `The correct translation is: ${result.correctTranslation}`
      );
      updateScore(10);
    } else {
      showModal(
        "Incorrect!",
        `The correct translation is: ${result.correctTranslation}`
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    showModal("Error", "An error occurred while checking the translation");
  }
}
