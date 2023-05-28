import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../libs/auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);

	if (auth === undefined) {
		res.status(404).json({ message: "No token found" });
		return;
	}

	res.status(200).json({ name: auth.username });
}
