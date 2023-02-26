"use strict";

window.onload = () => {
	run();
}

function run() {
	readJSON().then(response => {
		displayWord(response);
	});
	addEventListenersToKeys();
}

function restart() {
	incorrectGuesses = -1;
	displayArray.length = 0;
	wordArray.length = 0;
	removeEventListenersFromKeys();
	resetHangman();
	setGameOutcome("reset");
	run();
}

const displayArray = [];
let wordArray;

function clearWord() {
	const htmlWord = document.querySelector("#word");
	htmlWord.textContent = "";
	return htmlWord;
}

function updateWordDisplay(displayArray) {
	const UTF_NO_BREAK_SPACE = "\u00A0";
	const ALL_SPACE_GLOBAL = / /g;
	const htmlWord = clearWord();
	const joinedString = displayArray.join(" ");
	htmlWord.textContent = joinedString.replace(ALL_SPACE_GLOBAL, UTF_NO_BREAK_SPACE);
}

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

async function readJSON() {
	const topic = document.querySelector("#topics").value;
	try {
		return await getWordsFromFile(topic);
	} catch (error) {
		console.log(error);
	}
}

function chooseRandomWord(response) {
	return response[getRandomNumber(response.length)];
}

function getRandomNumber(length) {
	return Math.floor(Math.random() * (length - 1));
}

let incorrectGuesses = -1;

function addEventListenersToKeys() {
	const keys = document.querySelectorAll(".key");

	keys.forEach(key => {
		key.addEventListener("click", handleClick);
	});
}

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

function removeEventListenersFromKeys() {
	const keys = document.querySelectorAll(".key");
	keys.forEach(key => {
		key.removeEventListener("click", handleClick);
	});
}


const TOTAL_HANGMAN_PARTS = 5;

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

function resetHangman() {
	const hangman = document.querySelector("pre");
	hangman.innerText = "";
}

function setGameOutcome(outcome) {
	const winLabel = document.querySelector("#winLabel");
	if (outcome === "reset") {
		winLabel.textContent = "";
		return;
	}

	winLabel.textContent = `You ${outcome}!`;
}
