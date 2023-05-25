import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../../libs/auth";
import conn from "../../../libs/database";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);

	const data = await conn.transaction(async (tx) => {
		const top10 = await tx.execute(
			`SELECT user_id, wpm, accuracy FROM TypeTest ORDER BY wpm desc LIMIT 10;`
		);

		const userTop = await tx.execute(
			`SELECT user_id, wpm, accuracy FROM TypeTest WHERE user_id="${auth?.username}" ORDER BY wpm DESC LIMIT 1;`
		);

		return [top10, auth ? userTop : undefined];
	});

	res.status(200).json({
		top10: data[0]?.rows,
		userTop: data[1]?.rows[0],
	});
}
