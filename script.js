const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

let words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      letter => `
  <span class='letter'>
  ${correctLetters.includes(letter) ? letter : ""}
  </span>
  `
    )
    .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You Won!";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWronglettersEL() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`).join("")}
  `;

  figureParts.forEach((part, index) => {
    const error = wrongLetters.length;

    if (index < error) {
      part.style.display = "block";
    }

    // check if lose
    if (error >= figureParts.length) {
      finalMessage.innerText = "Unfortunately You Lost!";
      popup.style.display = "flex";
    }
  });
}

// Show notification
function showNotifications() {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 1000);
}

// Keydown letter press
window.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotifications();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWronglettersEL();
      } else {
        showNotifications();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWronglettersEL();
  popup.style.display = "none";
});

displayWord();
