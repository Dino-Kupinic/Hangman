"use strict";

window.onload = () => {
	run();
}

function run() {
	readJSON().then(response => {
		const { word } = chooseRandomWord(response);
		const wordArray = [...word];
		const displayArray = [];

		console.log(word)
		console.log(wordArray)

		for (let i = 0; i < word.length; i++) {
			if (wordArray[i] !== " ") {
				displayArray.push("_");
			} else {
				displayArray.push(" ");
			}
		}
		console.log(displayArray)
		const htmlWord = document.querySelector("#word");
		htmlWord.textContent = displayArray;
	});
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
