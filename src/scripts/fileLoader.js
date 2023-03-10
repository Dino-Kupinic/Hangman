"use strict";

let animals;
let cars;
let cities;
let difficulty;

/**
 * loads the JSONs after the DOM has loaded
 */
window.onload = () => {
	difficulty = getDifficulty();
	initialLoadJSONs();
}

/**
 * loads all the JSONs
 */
function initialLoadJSONs() {
	animals = getJSON("animals");
	cars = getJSON("cars");
	cities = getJSON("cities");
}

/**
 * fetches the JSON and responds with a json object which then gets processed by returnCorrectSection()
 * @param topic animals, cars or cities
 * @returns {Promise<any>} promise to return a json
 */
function getJSON(topic) {
	return fetch(`words/${topic}.json`)
		.then((response) => response.json())
		.then((json) => returnCorrectSection(json))
		.catch(error => console.log(error));
}

/**
 * reads the value from the difficulty
 * @returns {*} easy, normal or hard
 */
function getDifficulty() {
	return document.querySelector("#difficulties").value;
}

/**
 * returns the JSON, but if the difficulty changed it reassigns the variables containing the topics
 * @param topic animals, cars or cities
 * @returns {*} value of the topic variables
 */
function requestJSON(topic) {
	const currentDifficulty = getDifficulty();

	if (currentDifficulty !== difficulty) {
		initialLoadJSONs();
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

/**
 * returns the correct part of the JSON based on the difficulty
 * @param json json containing either easy, normal or hard
 * @returns {*} array with words
 */
function returnCorrectSection(json) {
	const difficulty = getDifficulty();

	switch (difficulty) {
		case "easy":
			return json.easy;
		case "normal":
			return json.normal;
		case "hard":
			return json.hard;
	}
}