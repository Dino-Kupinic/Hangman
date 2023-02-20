"use strict";

import jsonLoader from "./fileLoader.js";

window.onload = () => {
	run().then(() => {});
}

async function run() {
	try {
		const json = await jsonLoader("animals");
		console.log(json);

	} catch (error) {
		console.log(error);
	}
}