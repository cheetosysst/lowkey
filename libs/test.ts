import { getBaseUrl } from "./url";
import { WordSet } from "./word";

export enum letterState {
	DEFAULT = 0,
	INCORRECT = 1,
	CORRECT = 2,
	CURRENT = 3,
}

export type WordState = Array<letterState>;

export const initTestState = {
	started: false,
	start: new Date(),
	end: new Date(),
	accuracy: 0.1,
	wpm: 0 as number,
	status: Array<letterState>(0) as WordState,
	positionLetter: 0,
	wordset: Array<string>(0) as WordSet,
};

export type TestStateType = typeof initTestState;

export enum validateState {
	PASSED = "validate_passed",
	ACCURACY = "validate_accuracy_error",
	WPM = "validate_wpm_error",
	TIME = "validate_time_error",
}

export function validate(
	typetest: Omit<TestStateType, "started" | "positionLetter">
) {
	if (typetest.accuracy < 0.3) return { result: validateState.ACCURACY };
	if (typetest.end.getTime() - typetest.start.getTime() < 1000)
		return { result: validateState.TIME };
	if (typetest.wpm > 300) return { result: validateState.WPM };
	return { result: validateState.PASSED };
}

export function submit(
	state: Omit<TestStateType, "started" | "positionLetter">
) {
	return fetch(`${getBaseUrl()}/api/test/submit`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(state),
	});
}
