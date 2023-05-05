import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { getBaseUrl } from "./url";

export const AuthContext = createContext(null);

export function AuthProvider({ children, ...props }) {
	const [auth, setAuth] = useState(false);
	const getOldAuth = async () => {
		const result = await fetch(`${getBaseUrl()}/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		const data = await result.json();

		if (data.message === "Authorized") setAuth(true);
		else if (data.message === "Bad credentials") setAuth(false);
		else setAuth(false);
	};
	useEffect(() => {
		getOldAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }} {...props}>
			{children}
		</AuthContext.Provider>
	);
}

export function getAuth(req) {
	const token = req.cookies.token;

	let result = null;

	try {
		result = jwt.verify(token, process.env.JWT_SECRETE);
	} catch (e) {
		result = undefined;
	}

	return result;
}
