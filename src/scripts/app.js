"use strict";

import jsonLoader from "./fileLoader.js";

window.onload = () => {
	run();
}

function run() {
	readJSON();
}

async function readJSON() {
	try {
		return await jsonLoader("animals");
	} catch (error) {
		console.log(error);
	}
}