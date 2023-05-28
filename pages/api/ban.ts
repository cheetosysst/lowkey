import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../libs/auth";
import conn from "../../libs/database";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);
	if (auth === undefined) res.status(401).json({ message: "no." });

	const data = await conn.execute(
		`SELECT type FROM Account WHERE id='${auth?.username}';`
	);

	// @ts-ignore
	const isAdmin = data.rows[0].type === "admin";

	if (!isAdmin) res.status(401).json("no.");

	const { target }: { target: string } = req.body;

	conn.execute(`UPDATE Account SET disabled=1 WHERE id='${target}';`);

	res.status(200);
}
