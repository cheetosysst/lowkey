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
	| { type: "end" }
	| { type: "reset"; wordset: Array<string> }
	| { type: "start"; time: Date }
	| { type: "update"; word: string };

const initTestState = {
	started: false,
	start: new Date(),
	end: new Date(),
	accuracy: 0.1,
	wpm: 0 as number,
	status: Array<letterState>(0) as WordState,
	positionLetter: 0,
	wordset: Array<string>(0) as WordSet,
};

type TestStateType = typeof initTestState;

function testReducer(state: TestStateType, action: TestAction): TestStateType {
	switch (action.type) {
		case "end":
			const end = new Date();
			const duration = (end.getTime() - state.start.getTime()) / 60000;
			const accruacy =
				state.status.filter((x) => x === letterState.CORRECT).length /
				state.wordset.length;

			console.log("ended", duration, accruacy);
			return {
				...state,
				accuracy: accruacy,
				wpm: state.wordset.join("").split(" ").length / duration,
			};
		case "reset":
			const wordset = Array.from(action.wordset.join(" "));
			return {
				...state,
				wordset: wordset,
				status: Array<letterState>(wordset.length).fill(
					letterState.DEFAULT
				),
				started: false,
				positionLetter: 0,
			};
		case "start":
			return {
				...state,
				start: action.time,
				started: true,
			};
		case "update":
			const range = Math.abs(action.word.length - state.positionLetter);
			const offset = Math.min(action.word.length, state.positionLetter);
			const status = state.status;
			for (let i = offset; i < offset + range; i++) {
				status[i] =
					state.wordset[i] === action.word[i]
						? letterState.CORRECT
						: i < state.positionLetter
						? letterState.DEFAULT
						: letterState.INCORRECT;
			}
			console.log(range, offset, status, action.word);
			return {
				...state,
				status: status,
				positionLetter: action.word.length,
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
			word: target.value,
		});

		if (testState.positionLetter + 1 >= testState.wordset.length) {
			testDispath({ type: "end" });
			resetTest();
			inputRef.current!.value = "";
		}
	};

	return (
		<>
			<p
				className="flex select-none flex-wrap justify-center gap-y-2 whitespace-pre break-words font-mono text-2xl font-medium tracking-wide transition-all duration-150"
				onClick={focusInput}
			>
				{testState.wordset.length && testState.status.length ? (
					testState.wordset.map((letter, index) => {
						return (
							<Letter
								letter={letter}
								key={`${letter}-${index}`}
								state={
									testState.positionLetter === index
										? letterState.CURRENT
										: testState.status[index]
								}
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
		<span key={key} className={`transition-all ${LETTER_STYLE[state]}`}>
			{letter}
		</span>
	);
}
