import conn from "../../libs/database";
import bcrypt from "bcrypt";

// TODO add more validation
export default async function handler(req, res) {
	const { username, password, email, nickname } = req.body;

	if (!(username && password && email && nickname)) {
		res.status(400).json({ message: "Bad credentials" });
		return;
	}

	const salt = await bcrypt.genSalt(13);
	const passwordHash = await bcrypt.hash(password, salt);

	conn.execute(
		`INSERT Account (id, email, name, passwd, create_date) VALUES ("${username}", "${email}", "${nickname}", "${passwordHash}", CURRENT_TIMESTAMP)`
	);

	res.status(200).json({
		instruction: "login",
	});
}
