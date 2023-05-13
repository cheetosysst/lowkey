import { ChangeEvent, createRef, useEffect, useReducer } from "react";
import { WordSet, getRandomSet, getWordSet } from "../libs/word";

export enum letterState {
	DEFAULT = 0,
	INCORRECT = 1,
	CORRECT = 2,
	CURRENT = 3,
}

const LETTER_STYLE = [
	`text-gray-500`,
	`text-orange-300`,
	`text-gray-200`,
	`bg-gray-400 text-gray-800`,
];

type WordState = Array<letterState>;

type TestAction =
	| { type: "next" }
	| { type: "reset"; wordset: Array<string> }
	| { type: "start"; time: Date }
	| { type: "update"; word: string };

const initTestState = {
	started: false,
	start: new Date(),
	end: new Date(),
	accuracy: 0.1,
	wpm: 0,
	status: Array<WordState>(0),
	positionWord: 0,
	positionLetter: 0,
	wordset: Array<string>(0) as WordSet,
};

type TestStateType = typeof initTestState;

function testReducer(state: TestStateType, action: TestAction): TestStateType {
	switch (action.type) {
		case "next":
			if (state.positionWord + 1 >= state.wordset.length) {
				const end = new Date();
				const duration =
					(end.getTime() - state.start.getTime()) / 60000;
				const accruacy =
					state.status.flat().filter((x) => x === letterState.CORRECT)
						.length /
					state.wordset.flatMap((x) => Array.from(x)).length;

				console.log("ended", duration, accruacy);
				return {
					...state,
					accuracy: accruacy,
					wpm: state.wordset.length / duration,
				};
			}
			return {
				...state,
				positionWord: state.positionWord + 1,
			};
		case "reset":
			return {
				...state,
				wordset: action.wordset,
				status: action.wordset.map((word) =>
					Array<letterState>(word.length).fill(letterState.DEFAULT)
				),
				started: false,
				positionLetter: 0,
				positionWord: 0,
			};
		case "start":
			return {
				...state,
				start: action.time,
				started: true,
			};
		case "update":
			const targetWord = state.wordset[state.positionWord];
			const currentWord = action.word;
			const currentWordLength = action.word.length;
			const wordState: WordState = Array<letterState>(targetWord.length)
				.fill(letterState.DEFAULT)
				.map((value, index) => {
					if (index >= currentWordLength) return letterState.DEFAULT;
					if (currentWord[index] === targetWord[index])
						return letterState.CORRECT;
					return letterState.INCORRECT;
				});

			// TODO this is bad
			const status = state.status;
			if (
				currentWord.length >= targetWord.length &&
				status[state.positionWord + 1]
			) {
				status[state.positionWord + 1][0] = letterState.CURRENT;
			} else if (status[state.positionWord + 1]) {
				status[state.positionWord + 1][0] = letterState.DEFAULT;
				wordState[currentWord.length] = letterState.CURRENT;
			} else {
				wordState[currentWord.length] = letterState.CURRENT;
			}
			status[state.positionWord] = wordState;
			return {
				...state,
				positionLetter: 0,
				status: status,
			};
		default:
			throw new Error();
	}
}

export default function TypeTest() {
	const [testState, testDispath] = useReducer(testReducer, initTestState);
	const inputRef = createRef<HTMLInputElement>();

	const resetTest = () =>
		getWordSet("english")
			.then((data) => getRandomSet(data.wordset, 30))
			.then((data) => testDispath({ type: "reset", wordset: data }))
			.then(() => (inputRef.current!.value = ""))
			.catch((e) => console.error(e));

	const focusInput = () => inputRef.current?.focus();

	useEffect(() => {
		resetTest();
	}, []);

	useEffect(() => {
		inputRef.current?.focus();
	}, [inputRef]);

	const changeHandler = (e: ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		if (!testState.started)
			testDispath({
				type: "start",
				time: new Date(),
			});

		testDispath({
			type: "update",
			word: target.value.trim(),
		});

		if (target.value.slice(-1) === " ") {
			testDispath({ type: "next" });
			target.value = "";

			if (testState.positionWord + 1 >= testState.wordset.length) {
				resetTest();
			}
		}
	};

	return (
		<>
			<p
				className="flex select-none flex-wrap justify-center gap-y-2 break-words font-mono text-2xl font-medium tracking-wide transition-all duration-150"
				onClick={focusInput}
			>
				{testState.wordset.length && testState.status.length ? (
					testState.wordset.map((word, index) => {
						return (
							<Word
								word={word}
								key={`${word}-${index}`}
								states={testState.status[index]}
								className="mr-3"
							/>
						);
					})
				) : (
					<span></span>
				)}
			</p>

			<div className="mt-10 flex justify-center gap-4">
				<span>{(testState.accuracy * 100).toFixed(1)}</span>
				<span>{testState.wpm.toFixed(1)}</span>
			</div>
			<div className="mt-10 flex justify-center">
				<input
					onChange={changeHandler}
					className="cursor-default opacity-0"
					ref={inputRef}
				/>
				<button onClick={resetTest}></button>
			</div>
		</>
	);
}

function Word({
	word,
	states,
	key,
	className,
}: {
	word: string;
	states?: Array<letterState>;
	key: string;
	className?: string;
}) {
	if (!states) return <></>;
	return (
		<span className={className}>
			{word.split("").map((letter, index) => (
				<Letter
					letter={letter}
					state={states[index]}
					key={`${key}-${letter}`}
				/>
			))}
		</span>
	);
}

function Letter({
	letter,
	state,
	key,
}: {
	letter: string;
	state: letterState;
	key: string;
}) {
	return (
		<span key={key} className={` transition-all ${LETTER_STYLE[state]}`}>
			{letter}
		</span>
	);
}
