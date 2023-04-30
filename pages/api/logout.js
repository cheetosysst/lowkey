import { getAuth } from "../../libs/auth";

export default async function handler(req, res) {
	const temp = req.cookies;

	const auth = getAuth(req);
	console.log(auth);

	if (auth === false) {
		res.status(200).json({ message: "No token found" });
		return;
	}

	res.setHeader("Set-Cookie", ["token="]);

	res.status(200).json({ message: "Bye" });
}
