import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../libs/database";
// @ts-expect-error
import bcrypt from "bcrypt";
import { Auth, getAuth } from "../../libs/auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);

	const {
		username,
		password,
		email,
		nickname,
	}: { username: string; password: string; email: string; nickname: string } =
		req.body;

	if (!(username && password && email && nickname)) {
		res.status(400).json({
			message: "Bad credentials",
			full_message: "Invalid credential.",
		});
		return;
	}

	const salt = await bcrypt.genSalt(13);
	const passwordHash: string = await bcrypt.hash(password, salt);

	const used = await conn
		.execute(`SELECT id FROM Account WHERE id="${username}";`)
		.catch((e) => {
			console.error(e);
			return undefined;
		});

	if (used?.rows.length) {
		res.status(409).json({
			message: "Username used",
			full_message: "Username taken",
		});
		return;
	}

	conn.execute(
		`INSERT Account (id, email, name, passwd, create_date) VALUES ("${username}", "${email}", "${nickname}", "${passwordHash}", CURRENT_TIMESTAMP)`
	)
		.then((_) => {
			res.status(200).json({
				message: "login",
			});
		})
		.catch((e) => {
			res.status(409).json({
				message: "invalid",
				full_message: "Account creation failed, contact support.",
			});
		});
}
