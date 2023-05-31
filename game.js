// Javascript code to play hangman game
// Hangman Game
const wordList = ['javascript', 'hangman', 'openai', 'programming', 'computer']; // List of words
let chosenWord = ''; // The word to guess
let guessedLetters = []; // Array to store guessed letters
let remainingGuesses = 6; // Number of remaining guesses

// Select a random word from the word list
function selectRandomWord() {
  chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Initialize the game
function initializeGame() {
  selectRandomWord();
  guessedLetters = [];
  remainingGuesses = 6;
  updateDisplay();
}

// Update the display
function updateDisplay() {
  // Clear the display
  document.getElementById('word-display').innerHTML = '';
  document.getElementById('guessed-letters').innerHTML = '';
  document.getElementById('remaining-guesses').innerHTML = remainingGuesses;

  // Display the word with blanks for unguessed letters
  let wordDisplay = '';
  for (let i = 0; i < chosenWord.length; i++) {
    if (guessedLetters.includes(chosenWord[i])) {
      wordDisplay += chosenWord[i];
    } else {
      wordDisplay += '_';
    }
    wordDisplay += ' ';
  }
  document.getElementById('word-display').innerHTML = wordDisplay;

  // Display the guessed letters
  document.getElementById('guessed-letters').innerHTML = guessedLetters.join(', ');

  // Check if the game is over
  if (remainingGuesses === 0) {
    document.getElementById('message').innerHTML = 'Game over! The word was ' + chosenWord;
    document.getElementById('game-over').style.display = 'block';
  } else if (!wordDisplay.includes('_')) {
    document.getElementById('message').innerHTML = 'Congratulations! You guessed the word!';
    document.getElementById('game-over').style.display = 'block';
  }
}

// Process the user's guess
function processGuess() {
  const input = document.getElementById('guess-input').value.toLowerCase();

  // Check if the input is a single letter
  if (input.length !== 1 || !input.match(/[a-z]/i)) {
    alert('Please enter a single letter.');
    return;
  }

  // Check if the letter has already been guessed
  if (guessedLetters.includes(input)) {
    alert('You have already guessed that letter.');
    return;
  }

  // Add the guessed letter to the array
  guessedLetters.push(input);

  // Check if the guessed letter is in the chosen word
  if (!chosenWord.includes(input)) {
    remainingGuesses--;
  }

  // Clear the input field
  document.getElementById('guess-input').value = '';

  // Update the display
  updateDisplay();
}

// Start a new game when the "New Game" button is clicked
document.getElementById('new-game').addEventListener('click', function () {
  document.getElementById('game-over').style.display = 'none';
  initializeGame();
});

// Process a guess when the "Guess" button is clicked
document.getElementById('guess-button').addEventListener('click', function () {
  processGuess();
});

// Initialize the game when the page loads
window.addEventListener('load', function () {
  initializeGame();
});

