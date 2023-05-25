import { ChangeEvent, createRef, useEffect, useReducer } from "react";
import { getRandomSet, getWordSet } from "../libs/word";
import {
	letterState,
	TestStateType,
	initTestState,
	validate,
	validateState,
	submit,
} from "../libs/test";

const LETTER_STYLE = [
	`text-gray-500`,
	`text-orange-300`,
	`text-gray-200`,
	`bg-gray-400 text-gray-800`,
];

type TestAction =
	| { type: "end"; time: Date }
	| { type: "reset"; wordset: Array<string> }
	| { type: "start"; time: Date }
	| { type: "update"; word: string }
	| { type: "submit" };

function testReducer(state: TestStateType, action: TestAction): TestStateType {
	switch (action.type) {
		case "submit":
			const validateResult = validate(state);
			const passed = validateResult.result === validateState.PASSED;

			if (passed) submit(state).catch((e) => console.error(e));

			return { ...state };
		case "end":
			const end = new Date();
			const duration = (end.getTime() - state.start.getTime()) / 60000;
			const accruacy =
				state.status.filter((x) => x === letterState.CORRECT).length /
				state.wordset.length;

			return {
				...state,
				accuracy: accruacy,
				wpm: state.wordset.join("").split(" ").length / duration,
				end: end,
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

			// Assign new state
			for (let i = offset; i < offset + range; i++) {
				status[i] =
					state.wordset[i] === action.word[i]
						? letterState.CORRECT
						: i < state.positionLetter
						? letterState.DEFAULT
						: letterState.INCORRECT;
			}

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

		if (!testState.started && target.value === " ") {
			target.value = "";
			return;
		}
		if (!testState.started) {
			const startTime = new Date();
			testDispath({
				type: "start",
				time: startTime,
			});
		}

		// Skip check
		const currentLetter = target.value.slice(-1);
		if (
			currentLetter === " " &&
			currentLetter !== testState.wordset[target.value.length - 1]
		) {
			target.value = target.value.replace(/.$/, "");
			for (
				let i = target.value.length - 1;
				testState.wordset[i + 1] && testState.wordset[i + 1] !== " ";
				i++
			)
				target.value = target.value.concat("", "-");

			if (target.value.length !== testState.wordset.length)
				target.value = target.value.concat(" ");
		}

		testDispath({
			type: "update",
			word: target.value,
		});

		if (target.value.length >= testState.wordset.length) {
			const endTime = new Date();
			testDispath({
				type: "end",
				time: endTime,
			});
			testDispath({
				type: "submit",
			});
			resetTest();
		}
	};

	return (
		<>
			<p
				className="select-none justify-center whitespace-pre-wrap break-words text-center font-mono text-2xl font-medium leading-10 tracking-wide blur-sm transition-all duration-150 focus-within:blur-none"
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
				<input
					onChange={changeHandler}
					className="cursor-default opacity-0"
					ref={inputRef}
				/>
			</p>

			<div className="mt-10 flex justify-center gap-4 text-gray-200">
				<span>{(testState.accuracy * 100).toFixed(1)}</span>
				<span>{testState.wpm.toFixed(1)}</span>
			</div>
			<div className="flex justify-center">
				<button
					onClick={resetTest}
					className="rounded-md bg-white/5 p-2 font-mono opacity-0 outline-none transition-all focus:opacity-100"
				>
					reset
				</button>
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
