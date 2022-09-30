/**
 * Fetch wordset from "/public/wordset/"
 * @param {string} name test
 * @returns Promise
 */
function getWordSet(name) {
	return new Promise(async (resolve, reject) => {
		const respond = await fetch(`/wordset/${name}.json`);
		if (!respond.ok) reject(respond.statusText);
		resolve(await respond.json());
	});
}

function getRandomSet(wordset, length) {
	const result = [];
	while (true) {
		const index = Math.floor(Math.random() * wordset.wordset.length);
		const word = wordset.wordset[index];
		if (word === result[-1]) continue;
		result.push(word.toLowerCase());
		if (result.length === length) break;
	}
	return result;
}

export { getWordSet, getRandomSet };
