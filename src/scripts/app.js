"use strict";

window.onload = () => {
	run();
}

function run() {
	displayArray.length = 0;
	readJSON().then(response => {
		displayWord(response);
	});
	addEventListenersToKeys();
}

function addEventListenersToKeys() {
	const keys = document.querySelectorAll(".key");
	keys.forEach(key => {
		key.addEventListener("click", () => {
			const letter = key.querySelector(".letter");
			const value = letter.textContent.toLowerCase();

			console.log(value)
			console.log(wordArray)
			console.log(displayArray)

			if (wordArray.includes(value)) {
				for (let i = 0; i < wordArray.length; i++) {
					if (wordArray[i] === value) {
						displayArray[i] = value;
					}
				}

				updateWordDisplay(displayArray)

				if (wordArray.toString() == displayArray.toString()) {
					console.log("win")
				}
			} else {
				console.log("hangman")
			}
		})
	})
}

const displayArray = [];
let wordArray;


function clearWord() {
	const htmlWord = document.querySelector("#word");
	htmlWord.textContent = "";
	return htmlWord;
}

function updateWordDisplay(displayArray) {
	const htmlWord = clearWord();
	htmlWord.textContent = displayArray.join(" ");
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
