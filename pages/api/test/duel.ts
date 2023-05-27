import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../../libs/auth";
import { TestStateType, validate } from "../../../libs/test";
import conn from "../../../libs/database";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { validateState } from "../../../libs/test";
import { UUIDTable, generateUUID, sqlTimestamp } from "../../../libs/misc";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);

	if (auth === undefined) {
		res.status(200).json({ message: "No token found" });
		return;
	}

	const startTime = new Date();
	const endTime = new Date();
	startTime.setTime(Date.parse(req.body.start));
	endTime.setTime(Date.parse(req.body.end));
	const testState = {
		...req.body,
		end: endTime,
		start: startTime,
	} as TestStateType;

	const isValidated = validate(testState).result === validateState.PASSED;
	const uuidTest = await generateUUID(UUIDTable.TypeTest);

	const queryTypeTest = `
	INSERT INTO TypeTest (
		id, 
		user_id,
		wpm,
		type,
		accuracy, 
		validate, 
		test_end,
		test_start
	) VALUES (
		UNHEX(REPLACE('${uuidTest}', '-', '')),
		'${auth.username}',
		${testState.wpm},
		'25w',
		${testState.accuracy.toFixed(2)},
		${isValidated},
		'${sqlTimestamp(testState.end)}',
		'${sqlTimestamp(testState.start)}'
	);`;

	const [duelOld] = await conn.transaction(async (tx) => {
		await tx.execute(queryTypeTest).catch((e) => console.error(e));
		const duel = await tx.execute(`
			SELECT HEX(Duel.id) as duel_id, player1, p1_test, wpm
			FROM Duel INNER JOIN TypeTest ON Duel.p1_test = TypeTest.id
			WHERE player1 != "${auth.username}" AND player2 IS NULL;
		`);
		return [duel.rows];
	});

	if (duelOld.length) {
		// Insert as player2

		// @ts-ignore
		const wpmP1 = Number(duelOld[0]["wpm"]);
		const wpmP2 = testState.wpm;
		// @ts-ignore
		const duelId = duelOld[0]["duel_id"];
		// @ts-ignore
		const player1 = duelOld[0]["player1"];
		const [winner, p1Exp, p2Exp] =
			wpmP1 > wpmP2
				? ["player1", 18, -9]
				: wpmP1 < wpmP2
				? ["player2", -9, 18]
				: ["tie", 5, 5];
		conn.transaction(async (tx) => {
			await tx.execute(`
				UPDATE Duel
				SET
					player2='${auth.username}',
					p2_test=UNHEX(REPLACE('${uuidTest}', '-', '')),
					winner='${winner}'
				WHERE
					id=UNHEX(REPLACE('${duelId}', '-', ''))
			`);
			await tx.execute(
				`UPDATE Account SET exp=exp+${p1Exp} WHERE id='${player1}'`
			);
			await tx.execute(
				`UPDATE Account SET exp=exp+${p2Exp} WHERE id='${auth.username}'`
			);
		});
	} else {
		// Insert as player1
		const uuidDuel = await generateUUID(UUIDTable.Duel);
		const query = `
		INSERT INTO Duel (id, player1, p1_test, duel_time)
		VALUES (
			UNHEX(REPLACE('${uuidDuel}', '-', '')),
			'${auth.username}',
			UNHEX(REPLACE('${uuidTest}', '-', '')),
			'${sqlTimestamp(testState.start)}'
		)`;
		conn.execute(query).catch((e) => console.error(e));
	}

	res.status(200).json({ message: "done." });
}
