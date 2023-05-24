import conn from "../../libs/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAuth } from "../../libs/auth";

export default async function handler(req, res) {
	// If user is already logged in

	if (getAuth(req) !== undefined) {
		res.status(200).json({ message: "Authorized" });
		return;
	}

	const { username, password } = req.body;

	// If either password or username is incorrect
	if (!(username && password)) {
		res.status(400).json({ message: "Bad credentials" });
		return;
	}

	const result = await conn
		.execute(
			`
			SELECT passwd, email, id, type
			FROM Account
			WHERE email = "${username}" OR id = "${username}";`
		)
		.catch((err) => {
			console.error(err);
			res.status(500).json(err);
		});

	const knownHash = result.rows[0].passwd;
	const verified = bcrypt.compare(password, knownHash);

	if (!verified) {
		res.status(401).json({ message: "Wrong password" });
		return;
	}

	const token = jwt.sign(
		{
			username: result.rows[0].id,
			email: result.rows[0].email,
			role: result.rows[0].type,
		},
		process.env.JWT_SECRETE,
		{
			expiresIn: "30d",
		}
	);

	res.setHeader(
		"Set-Cookie",
		`token=${token}; HttpOnly; Secure; Max-Age=2592000; SameSite=Strict`
	);

	res.status(200).json({ message: "Authorized" });
}
