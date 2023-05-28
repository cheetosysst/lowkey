const EXP_CONSTANT = 0.1;

export function getLevel(exp: number) {
	return Math.floor(0.1 * Math.sqrt(exp)) + 1;
}
