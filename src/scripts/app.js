"use strict";

function run() {
	readJSON().then(response => {
		console.log(chooseRandomWord(response));
	});
}

window.onload = () => {
	run();
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
