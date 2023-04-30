import conn from "../../libs/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
	const { username, password } = req.body;

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
			console.log(err);
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
			username: result.rows[0].username,
			email: result.rows[0].email,
			role: result.rows[0].type,
		},
		process.env.JWT_SECRETE,
		{
			expiresIn: "30d",
		}
	);

	res.setHeader("Set-Cookie", [
		`token=${token}`,
		"Max-Age: 2600000",
		"SameSite=Strict",
		"secure",
	]);

	res.status(200).json({ message: "Authorized" });
}
