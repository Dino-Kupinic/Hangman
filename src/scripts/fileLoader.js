"use strict";

export default function getWordsFromFile(topic) {
	switch (topic) {
		case "animals":
		case "cars":
		case "austrian cities":
			return fetch(`words/${topic}.json`)
				.then((response) => response.json())
				.then((json) => {
					return json;
				});
		default:
			throw "invalid topic found";
	}
}