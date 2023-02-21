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
	const randomNumber = getRandomNumber(response.length);

	switch (randomNumber) {
		case 0:
			return response[0];
		case 1:
			return response[1];
		case 2:
			return response[2];
	}
}

function getRandomNumber(length) {
	return Math.floor(Math.random() * (length - 1));
}
