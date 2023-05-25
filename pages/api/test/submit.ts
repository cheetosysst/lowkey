import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../../libs/auth";
import { TestStateType, validate } from "../../../libs/test";
import conn from "../../../libs/database";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { validateState } from "../../../libs/test";

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

	const validateResult = validate(testState);
	const uuid = await generateUUID();

	const query = `
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
		UNHEX(REPLACE('${uuid}', '-', '')),
		'${auth.username}',
		${testState.wpm},
		'25w',
		${testState.accuracy.toFixed(2)},
		${validateResult.result === validateState.PASSED},
		'${testState.end.toISOString().slice(0, 23).replace("T", " ")}',
		'${testState.start.toISOString().slice(0, 23).replace("T", " ")}'
	);`;

	conn.execute(query)
		.then((data) => {
			res.status(200).json({ message: "Result saved." });
		})
		.catch((e) => {
			console.error(e);
			res.status(500).json({
				message:
					"Failed saving test result to database. Contact support.",
			});
		});
}

const generateUUID = async (): Promise<string> => {
	while (true) {
		const uuid: string = uuidv4();
		const test = await conn.execute(
			`SELECT COUNT(*) FROM TypeTest WHERE id=UNHEX(REPLACE('${uuid}', '-', ''));`
		);

		// @ts-ignore
		if (Number(test.rows[0]["count(*)"])) continue;

		return uuid;
	}
};