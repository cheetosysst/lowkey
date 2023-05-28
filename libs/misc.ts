// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import conn from "./database";

export const sqlTimestamp = (time: Date): string =>
	time.toISOString().slice(0, 23).replace("T", " ");

export function getMonthStart() {
	const today = new Date();
	return `${today.getUTCFullYear()}-${
		Math.floor((today.getUTCMonth() + 1) / 9) ? "" : "0"
	}${today.getUTCMonth() + 1}-01T00:00:00.000+00:00`;
}

export enum UUIDTable {
	TypeTest = "TypeTest",
	Duel = "Duel",
}

export const generateUUID = async (table: UUIDTable): Promise<string> => {
	while (true) {
		const uuid: string = uuidv4();
		const test = await conn.execute(
			`SELECT COUNT(*) FROM ${table} WHERE id=UNHEX(REPLACE('${uuid}', '-', ''));`
		);

		// @ts-ignore
		if (Number(test.rows[0]["count(*)"])) continue;

		return uuid;
	}
};
