"use strict";

export default function getWordsFromFile(topic) {
	switch (topic) {
		case "animals":
		case "cars":
		case "austrian cities":
			return fetch(`words/${topic}.json`)
				.then((response) => response.json())
				.then((json) => returnCorrectSection(json))
				.catch(error => console.log(error));
		default:
			throw "invalid topic found";
	}
}

function returnCorrectSection(json) {
	const difficulty = document.querySelector("#difficulties").value;

	switch (difficulty) {
		case "easy":
			return json.easy;
		case "normal":
			return json.normal;
		case "hard":
			return json.hard;
	}
}