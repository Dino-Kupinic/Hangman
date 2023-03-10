"use strict";

/**
 * runs the script after the DOM elements have loaded successfully
 */
window.onload = () => {
	run();
}

/**
 * prepares a new word and adds event listener to the keyboard
 */
function run() {
	readJSON().then(response => {
		displayWord(response);
	});
	addEventListenersToKeys();
}

/**
 * resets the game state
 */
function restart() {
	resetArraysAndGuesses();
	removeEventListenersFromKeys();
	resetHangman();
	setGameOutcome("reset");
	run();
}

/**
 * resets the arrays and variables for displaying and guessing a word
 */
function resetArraysAndGuesses() {
	incorrectGuesses = -1;
	displayArray.length = 0;
	wordArray.length = 0;
}

/**
 * clears the onscreen word
 * @returns {Element} the cleared word
 */
function clearWord() {
	const htmlWord = document.querySelector("#word");
	htmlWord.textContent = "";
	return htmlWord;
}

/**
 * updates the onscreen word with the correct letters that have been guessed
 * @param displayArray the array used for the onscreen word
 */
function updateWordDisplay(displayArray) {
	const UTF_NO_BREAK_SPACE = "\u00A0";
	const ALL_SPACE_GLOBAL = / /g;
	const htmlWord = clearWord();
	const joinedString = displayArray.join(" ");
	htmlWord.textContent = joinedString.replace(ALL_SPACE_GLOBAL, UTF_NO_BREAK_SPACE);
}

const displayArray = [];
let wordArray;

/**
 * gets the word from the JSON and fills the displayArray with either _ or whitespaces
 * @param response response from the promise
 */
function displayWord(response) {
	const {word} = chooseRandomWord(response);
	wordArray = [...word];

	for (let i = 0; i < word.length; i++) {
		if (wordArray[i] !== " ") {
			displayArray.push("_");
		} else {
			displayArray.push(" ");
		}
	}
	updateWordDisplay(displayArray);
}

/**
 * reads a JSON from /src/words/
 * @returns {Promise<*>} promise to return a JSON response
 */
async function readJSON() {
	const topic = document.querySelector("#topics").value;
	try {
		return await requestJSON(topic);
	} catch (error) {
		console.log(error);
	}
}

/**
 * returns a random word from the json
 * @param response the json
 * @returns {*} word at index
 */
function chooseRandomWord(response) {
	return response[getRandomNumber(response.length)];
}

/**
 * generates a random number from 0 to length of the json with the words minus 1
 * @param length length of the json array
 * @returns {number} number between 0 and length - 1
 */
function getRandomNumber(length) {
	return Math.floor(Math.random() * (length - 1));
}

let incorrectGuesses = -1;

/**
 * iterates through all keys and adds event listeners to them
 */
function addEventListenersToKeys() {
	const keys = document.querySelectorAll(".key");

	keys.forEach(key => {
		key.addEventListener("click", handleClick);
	});
}

/**
 * handles the game logic
 * @param event click event
 */
function handleClick(event) {
	const winLabel = document.querySelector("#winLabel");
	if (winLabel.textContent === "You win!" || winLabel.textContent === "You lost!") {
		return;
	}

	const key = event.currentTarget;
	const letter = key.querySelector(".letter");
	const value = letter.textContent.toLowerCase();

	if (wordArray.includes(value)) {
		for (let i = 0; i < wordArray.length; i++) {
			if (wordArray[i] === value) {
				displayArray[i] = value;
			}
		}
		updateWordDisplay(displayArray)
		if (wordArray.toString() === displayArray.toString()) {
			setGameOutcome("win");
		}
	} else {
		if (incorrectGuesses !== TOTAL_HANGMAN_PARTS) {
			incorrectGuesses++;
		}
	}
	updateHangman(incorrectGuesses);
}

/**
 * removes the event listeners after a restart to prevent undefined behaviour
 */
function removeEventListenersFromKeys() {
	const keys = document.querySelectorAll(".key");
	keys.forEach(key => {
		key.removeEventListener("click", handleClick);
	});
}

const TOTAL_HANGMAN_PARTS = 5;

/**
 * updates the ASCII hangman on the left
 * @param incorrectGuesses
 */
function updateHangman(incorrectGuesses) {
	const hangmanParts = [
		'  _________\n  |        |\n  |\n  |\n  |\n  |\n _|\n|_|______',
		'  _________\n  |        |\n  |        O\n  |\n  |\n  |\n _|\n|_|______',
		'  _________\n  |        |\n  |        O\n  |        |\n  |        |\n  |\n _|\n|_|______',
		'  _________\n  |        |\n  |        O\n  |       /|\n  |        |\n  |\n _|\n|_|______',
		'  _________\n  |        |\n  |        O\n  |       /|\\\n  |        |\n  |\n _|\n|_|______',
		'  _________\n  |        |\n  |        O\n  |       /|\\\n  |        |\n  |       / \\\n _|\n|_|______'
	];

	const hangman = document.querySelector("pre");
	if (incorrectGuesses <= TOTAL_HANGMAN_PARTS && incorrectGuesses >= 0) {
		hangman.innerText = hangmanParts[incorrectGuesses];
		if (incorrectGuesses === TOTAL_HANGMAN_PARTS) {
			setGameOutcome("lost");
		}
	}
}

/**
 * removes the ASCII hangman
 */
function resetHangman() {
	const hangman = document.querySelector("pre");
	hangman.innerText = "";
}

/**
 * informs the player whether they have won or lost on the right side of the screen
 * @param outcome "won" or "lost"
 */
function setGameOutcome(outcome) {
	const winLabel = document.querySelector("#winLabel");
	if (outcome === "reset") {
		winLabel.textContent = "";
		return;
	}

	winLabel.textContent = `You ${outcome}!`;
}
