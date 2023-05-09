import { useEffect, useState, useRef, useMemo } from "react";
import { getRandomSet, getWordSet } from "../libs/word";
import WPM from "./wpm.components";

const LETTER_STYLE = [
	`text-gray-400`,
	`text-gray-200`,
	`text-orange-300`,
	`bg-gray-400 text-gray-800`,
];

export default function Test({ ...props }) {
	const [words, setWords] = useState([]);
	const [wordStatus, setWordStatus] = useState([]);
	const [startTime, setStartTime] = useState(new Date(2000, 1, 1));
	const [wordsetName, setWordsetName] = useState("english");

	const inputArea = useRef(null);
	const wordset = useMemo(() => getWordSet(wordsetName), [wordsetName]);

	const [wordPos, setWordPos] = useState(0);
	const [cursorPos, setCursorPos] = useState([0, 0]);

	const [focus, setFocus] = useState(true);

	const [wpm, setWPM] = useState(undefined);
	const [testState, setTestState] = useState(false);

	const initTest = () => {
		inputArea.current.value = "";

		Promise.race([wordset]).then((data) => {
			const randomSetData = getRandomSet(data.wordset, 25);
			setWords(randomSetData.map((item) => item + " "));
		});

		setWordPos(0);
		setCursorPos([0, 0]);
		setStartTime(new Date(2000, 1, 1));
	};

	// Word set init.
	useEffect(() => {
		initTest();
	}, []);

	// Word status init.
	useEffect(() => {
		const tempWordStatus = [];
		const wordsLength = words.length;

		for (let i = 0; i < wordsLength; i++)
			tempWordStatus.push(Array(words[i].length + 1).fill(0));

		setWordStatus(tempWordStatus);
	}, [words]);

	const wordElements = words.map((value, indexWord) => {
		if (!value || !wordStatus.length) return false;
		return value
			.split("")
			.map((value, indexLetter) => (
				<Letters
					key={`letterElement-${indexWord}-${indexLetter}`}
					styleText={LETTER_STYLE[wordStatus[indexWord][indexLetter]]}
					styleCursor={
						indexWord === cursorPos[0] &&
						indexLetter === cursorPos[1]
							? "bg-neutral-600"
							: ""
					}
					letter={value}
				/>
			));
	});

	useEffect(() => {
		inputFocus();
	}, []);

	useEffect(() => {
		inputFocus();
	}, [props.panelStatus]);

	const inputFocus = () => {
		inputArea.current.focus();
		setFocus(true);
	};

	const inputHandler = (e) => {
		if (
			!cursorPos[0] &&
			!cursorPos[1] &&
			startTime.getTime() === new Date(2000, 1, 1).getTime()
		) {
			setStartTime(new Date());
			setTestState(false);
		}

		const lastLetter = e.target.value.slice(-1);
		if (lastLetter === " ") {
			e.target.value = "";
			setWordPos(wordPos + 1);
			if (wordPos + 1 === words.length) {
				const deltaMinute =
					(new Date().getTime() - startTime.getTime()) / 60000;
				const wpm = Number((words.length / deltaMinute).toFixed(1));
				setWPM(wpm);
				setTestState(true);
				initTest();
				return;
			}
			setCursorPos([wordPos + 1, 0]);
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
		setCursorPos([wordPos, e.target.value.length]);

		return;
	};

	const keydownHandler = (e) => {
		if (e.keyCode != 13) return;
		e.preventDefault();
	};

	const restartHandler = (e) => {
		e.preventDefault();
		initTest();
		inputFocus();
	};

	return (
		<div>
			<p
				className={`${
					focus ? "" : "blur-sm"
				} select-none font-medium transition-all duration-300`}
				onClick={inputFocus}
			>
				{wordElements}
			</p>
			<WPM wpm={wpm} show={testState} />
			<br />
			<form>
				<input
					className="opacity-0 cursor-default"
					ref={inputArea}
					onChange={inputHandler}
					onKeyDown={keydownHandler}
					onBlur={() => setFocus(false)}
				/>
				<button
					className="opacity-0 cursor-default"
					onClick={restartHandler}
				>
					123
				</button>
			</form>
		</div>
	);
}

function Letters({ letter, styleCursor, styleText, ...props }) {
	return (
		<span
			className={`duration-150 transition-all font-mono ${styleText} ${styleCursor}`}
			{...props}
		>
			{letter}
		</span>
	);
}
