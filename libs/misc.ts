export const sqlTimestamp = (time: Date): string =>
	time.toISOString().slice(0, 23).replace("T", " ");

export function getMonthStart() {
	const today = new Date();
	return `${today.getUTCFullYear()}-${
		Math.floor((today.getUTCMonth() + 1) / 9) ? "" : "0"
	}${today.getUTCMonth() + 1}-01T00:00:00.000+00:00`;
}
