import { createContext, useState } from "react";
import jwt from "jsonwebtoken";

export const AuthContext = createContext(null);

export function AuthProvider({ children, ...props }) {
	const [auth, setAuth] = useState(false);
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export function getAuth(req) {
	const token = req.cookies.token;

	const result = jwt.verify(token, process.env.JWT_SECRETE, (e) => {
		switch (e) {
			case "TokenExpiredError":
			case "JsonWebTokenError":
			case "NotBeforeError":
			default:
				return false;
		}
	});
	return result;
}
