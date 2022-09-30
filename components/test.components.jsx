import { useEffect, useState, useRef } from "react";

const tempWordSet = ["test", "hello", "world"];

export default function Test({ ...props }) {
	const [words, setWords] = useState([]);
	const [wordElement, setWordElement] = useState([]);
	const [wordStatus, setWordStatus] = useState([]);
	const inputArea = useRef(null);

	const [letterPos, setLetterPos] = useState(0);
	const [wordPos, setWordPos] = useState(0);
	const [cursorPos, setCursorPos] = useState([0, 0]);

	const [focus, setFocus] = useState(true);

	// Word set init.
	// TODO: Use random word set.
	// TODO: Add restart
	useEffect(() => {
		setWords(tempWordSet.map((item) => item + " "));
		setLetterPos(0);
		setWordPos(0);
		setCursorPos([0, 0]);
	}, []);

	// Word status init.
	useEffect(() => {
		const tempWordStatus = [];

		for (let i = 0; i < words.length; i++) {
			tempWordStatus.push(Array(words[i].length + 1).fill(0));
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

		for (const item of words) {
			let letterCount = -1;
			tempElements.push(
				item.split("").map((letter) => {
					letterCount += 1;

					const styleIndex =
						wordStatus[tempElements.length][letterCount];

					const isCursor =
						tempElements.length === cursorPos[0] &&
						letterCount === cursorPos[1];

					return (
						<span
							className={`${letterStyle[styleIndex]} ${
								isCursor ? "bg-teal-900" : ""
							} duration-150 transition-all font-mono`}
							key={`wordElement-${tempElements.length}-${letterCount}`}
						>
							{letter}
						</span>
					);
				})
			);
		}
		setWordElement(tempElements);
	}, [words, wordStatus, cursorPos]);

	useEffect(() => {
		inputFocus();
	}, []);

	const inputFocus = () => {
		inputArea.current.focus();
		setFocus(true);
	};

	const inputHandler = (e) => {
		const lastLetter = e.target.value.slice(-1);
		if (lastLetter === " ") {
			setWordPos(wordPos + 1);
			setLetterPos(0);
			setCursorPos([wordPos + 1, 0]);
			e.target.value = "";
			return;
		}

		if (wordStatus[wordPos] === undefined) return;

		const tempStatus = [...wordStatus];
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
		setLetterPos(e.target.value.length);
		setCursorPos([wordPos, letterPos + 1]);

		return;
	};

	const keydownHandler = (e) => {
		if (e.keyCode != 13) return;
		e.preventDefault();
	};

	return (
		<div {...props}>
			<p
				className={`${
					focus ? "" : "blur-sm"
				} select-none font-medium transition-all duration-150`}
				onClick={inputFocus}
			>
				{wordElement}
			</p>
			<br />
			<form>
				<input
					className="opacity-0"
					ref={inputArea}
					onChange={inputHandler}
					onKeyDown={keydownHandler}
					onBlur={() => setFocus(false)}
				/>
			</form>
		</div>
	);
}
