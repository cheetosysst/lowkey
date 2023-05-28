import { ReactNode, createContext, useEffect, useReducer } from "react";
// @ts-expect-error
import jwt from "jsonwebtoken";
import { getBaseUrl } from "./url";
import { NextApiRequest } from "next";

export type Auth = {
	username: string;
	email: string;
	role: string;
};

const initLoginState = {
	isAuth: false,
	isAdmin: false,
};
type LoginAction =
	| { type: "CHANGE_AUTH"; state: boolean }
	| { type: "CHANGE_ADMIN"; state: boolean };

export const AuthContext = createContext<{
	state: typeof initLoginState;
	dispatch: (action: LoginAction) => void;
}>({
	state: initLoginState,
	dispatch: () => {},
});

const loginReducer = (state: typeof initLoginState, action: LoginAction) => {
	switch (action.type) {
		case "CHANGE_AUTH":
			return { isAuth: action.state, isAdmin: state.isAdmin };
		case "CHANGE_ADMIN":
			return { isAuth: state.isAuth, isAdmin: action.state };
		default:
			throw Error("Unknow action");
	}
};

export function AuthProvider({ children, ...props }: { children: ReactNode }) {
	const [auth, setAuth] = useReducer(loginReducer, initLoginState);

	const getOldAuth = async () => {
		const result = await fetch(`${getBaseUrl()}/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		const data = await result.json();

		if (data.message === "Authorized")
			setAuth({ type: "CHANGE_AUTH", state: true });
		else if (data.message === "Bad credentials")
			setAuth({ type: "CHANGE_AUTH", state: false });
		else setAuth({ type: "CHANGE_AUTH", state: false });
	};

	useEffect(() => {
		getOldAuth();
	}, []);

	const value = { state: auth, dispatch: setAuth };

	return (
		<AuthContext.Provider value={value} {...props}>
			{children}
		</AuthContext.Provider>
	);
}

export function getAuth(req: NextApiRequest) {
	const token = req.cookies.token;

	let result = null;

	try {
		result = jwt.verify(token, process.env.JWT_SECRETE);
	} catch (e) {
		result = undefined;
	}

	return result;
}
