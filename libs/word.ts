import { getBaseUrl } from "./url";

export type WordSet = Array<string>;
export type WordSetFile = {
	name: string;
	wordset: WordSet;
};

/**
 * Retrieve and parse worset file.
 * @param name Name of wordset
 */
async function getWordSet(name: string): Promise<WordSetFile> {
	return fetch(`${getBaseUrl()}/wordset/${name}.json`).then((data) =>
		data.json()
	);
}

/**
 * Generates a random wordset.
 * @param wordset Array of words
 * @param length Length of the random word set
 */
function getRandomSet(wordset: WordSet, length: number) {
	return Array.from({ length: length }, () =>
		wordset[Math.floor(Math.random() * wordset.length)].toLowerCase()
	);
}

export { getWordSet, getRandomSet };
