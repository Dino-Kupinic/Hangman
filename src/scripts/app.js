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

function addEventListenersToKeys() {
	const keys = document.querySelectorAll(".key");
	keys.forEach(key => {
		key.addEventListener("click", () => {
			const letter = key.querySelector(".letter");
			const value = letter.textContent.toLowerCase();

			if (wordArray.includes(value)) {
				const index = wordArray.indexOf(value);
				displayArray[index] = value;
				updateHTMLword(displayArray)
				if (wordArray.toString() == displayArray.toString()) {
					// win
				}
			} else {
				console.log("hangman")
			}
		})
	})
}

const displayArray = [];
let wordArray;


function updateHTMLword(displayArray) {
	const htmlWord = document.querySelector("#word");
	htmlWord.textContent = "";
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

	updateHTMLword(displayArray);
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
