import { useEffect, useState, useRef, useMemo } from "react";
import { getRandomSet, getWordSet } from "../libs/word";
import WPM from "./wpm.components";

export default function Test({ ...props }) {
	const [words, setWords] = useState([]);
	const [wordElement, setWordElement] = useState([]);
	const [wordStatus, setWordStatus] = useState([]);
	const [startTime, setStartTime] = useState(new Date(2000, 1, 1));
	const [wordsetName, setWordsetName] = useState("english");

	const inputArea = useRef(null);
	const wordset = useMemo(() => getWordSet(wordsetName), [wordsetName]);

	const [wordPos, setWordPos] = useState(0);
	const [cursorPos, setCursorPos] = useState([0, 0]);

	const [focus, setFocus] = useState(true);

	const [wpm, setWPM] = useState(undefined);
	const [wpmVisible, setWPMVisible] = useState(false);

	const initTest = () => {
		inputArea.current.value = "";

		Promise.all([wordset]).then((data) => {
			const randomSetData = getRandomSet(data[0], 25);
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

		for (let i = 0; i < words.length; i++) {
			tempWordStatus.push(Array(words[i].length + 1).fill(0));
		}

		setWordStatus(tempWordStatus);
	}, [words]);

	useEffect(() => {
		if (
			wordStatus === undefined ||
			!Array.isArray(wordStatus) ||
			!wordStatus.length ||
			wordStatus.length !== words.length
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
								isCursor ? "bg-neutral-600" : ""
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
			setWPMVisible(false);
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
				setWPMVisible(true);
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
				{wordElement}
			</p>
			<WPM wpm={wpm} show={wpmVisible} />
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
