"use strict";

import jsonLoader from "./fileLoader.js";

window.onload = () => {
	run();
}

export function run() {
	readJSON().then(response => {
		console.log(chooseRandomWord(response));
	});
}

async function readJSON() {
	const topic = document.querySelector("#topics").value;
	try {
		return await jsonLoader(topic);
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
