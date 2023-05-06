import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "../../libs/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const auth = getAuth(req);

	if (auth === false) {
		res.status(200).json({ message: "No token found" });
		return;
	}

	res.setHeader(
		"Set-Cookie",
		`token=no; HttpOnly; Secure; Max-Age=2592000; SameSite=Strict`
	);

	res.status(200).json({ message: "Bye" });
}
