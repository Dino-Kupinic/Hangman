"use strict";

let animals;
let cars;
let cities;
let difficulty;

window.onload = () => {
	difficulty = document.querySelector("#difficulties").value;
}

(function initialLoadJSONs() {
	animals = getJSON("animals");
	cars = getJSON("cars");
	cities = getJSON("cities");
})();

function getJSON(topic) {
	return fetch(`words/${topic}.json`)
		.then((response) => response.json())
		.then((json) => returnCorrectSection(json))
		.catch(error => console.log(error));
}

function requestJSON(topic) {
	const currentDifficulty = document.querySelector("#difficulties").value;

	if (currentDifficulty !== difficulty) {
		return getJSON(topic);
	}

	switch (topic) {
		case "animals":
			return animals;
		case "cars":
			return cars;
		case "cities":
			return cities;
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