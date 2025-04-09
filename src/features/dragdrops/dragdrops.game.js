import { fetchWords } from "./dragdrops.api.js";
import { shuffleArray } from "./dragdrops.utils.js";
import { displayWords, updateScoreboard } from "./dragdrops.ui.js";
import { WORDS_PER_PAGE } from "./dragdrops.constants.js";

const gameState = {
  words: [],
  draggedWord: null,
  currentIndex: 0,
  correctCount: 0,
  incorrectCount: 0,
};

export const initializeGame = async (language) => {
  try {
    gameState.words = await fetchWords(language);
    gameState.currentIndex = 0;
    gameState.correctCount = 0;
    gameState.incorrectCount = 0;

    displayWords(gameState.words, gameState.currentIndex);
    updateScoreboard(gameState.correctCount, gameState.incorrectCount);
  } catch (error) {
    console.error("Game initialization error:", error);
    throw error;
  }
};

export const handleDragStart = (event) => {
  if (event.target.classList.contains("word-card")) {
    gameState.draggedWord = event.target;
    event.dataTransfer.setData("text/plain", event.target.textContent);
  }
};

export const handleDrop = (event) => {
  event.preventDefault();
  if (!gameState.draggedWord) return;

  const translationCard = event.target.closest(".icon-card");
  if (!translationCard) return;

  const isCorrect =
    translationCard.dataset.translation ===
    gameState.draggedWord.textContent.trim();

  if (isCorrect) {
    gameState.correctCount++;
    handleCorrectMatch(translationCard, gameState.draggedWord);
  } else {
    gameState.incorrectCount++;
    handleIncorrectMatch(translationCard, gameState.draggedWord);
  }

  updateScoreboard(gameState.correctCount, gameState.incorrectCount);
  gameState.draggedWord = null;
};

export const showNextWords = () => {
  if (gameState.currentIndex + WORDS_PER_PAGE < gameState.words.length) {
    gameState.currentIndex += WORDS_PER_PAGE;
    displayWords(gameState.words, gameState.currentIndex);
  }
};

export const showPreviousWords = () => {
  if (gameState.currentIndex > 0) {
    gameState.currentIndex -= WORDS_PER_PAGE;
    displayWords(gameState.words, gameState.currentIndex);
  }
};

export const getGameState = () => gameState;
