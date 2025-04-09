import { startGame as apiStartGame, submitGuess } from "./guesswords.api.js";
import {
  updateGameUI,
  showMessage,
  updateScoreboard,
} from "./guesswords.ui.js";
import { getSelectedLanguage } from "./guesswords.events.js";

let userToken = localStorage.getItem("token");
let score = 0;
let currentWord = "";
let currentWordIndex = 0;

export async function startGame() {
  try {
    const data = await apiStartGame(
      getSelectedLanguage(),
      currentWordIndex,
      userToken
    );
    currentWord = data.word || data.hiddenWord;
    updateGameUI(data);
    showMessage(
      `Game started! Language: ${getSelectedLanguage().toUpperCase()}`
    );
  } catch (error) {
    showMessage(error.message || "Error starting game");
  } finally {
    document.getElementById("start-game").disabled = false;
  }
}

export async function handleGuess() {
  const letterInput = document.getElementById("letterInput");
  if (!letterInput) return;

  const letter = letterInput.value.toLowerCase();
  if (!letter) return;

  try {
    const data = await submitGuess(
      letter,
      getSelectedLanguage(),
      currentWordIndex,
      userToken
    );
    updateGameUI(data);
    handleGuessResult(data);
  } catch (error) {
    showMessage(error.message || "Error processing guess");
  } finally {
    letterInput.value = "";
  }
}

function handleGuessResult(data) {
  if (data.success) {
    if (data.hiddenWord && !data.hiddenWord.includes("_")) {
      score++;
      updateScoreboard(score);
      showMessage("Congratulations! You guessed the word!");
    } else {
      showMessage("Correct guess!");
    }
  } else {
    showMessage("Wrong guess, try again.");
  }
}

export async function loadNextWord() {
  currentWordIndex++;
  await startGame();
}

export async function loadPreviousWord() {
  if (currentWordIndex > 0) {
    currentWordIndex--;
    await startGame();
  }
}
