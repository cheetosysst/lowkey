import { useEffect, useState, useRef } from "react";

export default function Test({ ...props }) {
	const [words, setWords] = useState([]);
	const [wordElement, setWordElement] = useState([]);
	const [wordStatus, setWordStatus] = useState([]);
	const inputArea = useRef(null);

	const [letterPos, setLetterPos] = useState(0);
	const [wordPos, setWordPos] = useState(0);

	// Word set init.
	// TODO: Use random word set.
	// TODO: Add restart
	useEffect(() => {
		setWords(["test", "hello", "world"]);
		setLetterPos(0);
		setWordPos(0);
	}, []);

	// Word status init.
	useEffect(() => {
		const tempWordStatus = [];

		for (let i = 0; i < words.length; i++) {
			tempWordStatus.push(Array(words[i].length).fill(0));
		}

		setWordStatus(tempWordStatus);
	}, [words]);

	useEffect(() => {
		if (
			wordStatus === undefined ||
			!Array.isArray(wordStatus) ||
			!wordStatus.length
		)
			return;

		const tempElements = [];
		const letterStyle = [
			`text-gray-400`,
			`text-gray-200`,
			`text-orange-300`,
			`bg-gray-400 text-gray-800`,
		];
		let spaceCount = 0;

		for (const item of words) {
			let letterCount = -1;
			tempElements.push(
				item.split("").map((letter) => {
					letterCount += 1;

					// divided by two, becasue all elements are followed by a <span> with empty a space inside
					const styleIndex =
						wordStatus[tempElements.length / 2][letterCount];

					return (
						<span
							className={`${letterStyle[styleIndex]}`}
							key={`wordElement-${tempElements.length}-${letterCount}`}
						>
							{letter}
						</span>
					);
				})
			);
			tempElements.push(
				<span key={`wordElement-space-${spaceCount}`}> </span>
			);
			spaceCount++;
		}
		setWordElement(tempElements);
	}, [words, wordStatus]);

	useEffect(() => {
		inputArea.current.focus();
	}, []);

	const inputHandler = (e) => {
		const lastLetter = e.target.value.slice(-1);
		if (lastLetter === " ") {
			// console.log(e.target.value, words[wordPos]);
			setWordPos(wordPos + 1);
			setLetterPos(0);
			e.target.value = "";
			return;
		}

		if (wordStatus[wordPos] === undefined) return;

		const tempStatus = [...wordStatus];

		// console.log(tempStatus[wordPos], e.target.value, wordPos, letterPos);

		// This part doesn't look very clean, as I what to leave space to
		// modify it in the future. Preferably we want to display
		// extra and false letters, but I havn't thought of aa good way
		// implement it.
		const wordLength = Math.max(
			tempStatus[wordPos].length,
			e.target.value.length
		);
		for (let idx = 0; idx < wordLength; idx++) {
			if (words[wordPos][idx] === e.target.value[idx])
				tempStatus[wordPos][idx] = 1;
			else if (
				e.target.value[idx] !== undefined &&
				words[wordPos][idx] !== e.target.value[idx]
			)
				tempStatus[wordPos][idx] = 2;
			else if (words[wordPos][idx] !== undefined)
				tempStatus[wordPos][idx] = 0;
		}

		setWordStatus(tempStatus);
		setLetterPos(letterPos + 1);
		return;
	};

	const keydownHandler = (e) => {
		if (e.keyCode != 13) return;
		e.preventDefault();
	};

	return (
		<div {...props}>
			<p className="font-medium">{wordElement}</p>
			<br />
			<form>
				<input
					// className="opacity-0"
					ref={inputArea}
					onChange={inputHandler}
					onKeyDown={keydownHandler}
				/>
			</form>
		</div>
	);
}
