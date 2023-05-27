import Router from "next/router";
import { ButtonTransparent } from "./button.components";
import { useContext } from "react";
import { AuthContext } from "../libs/auth";
import { getBaseUrl } from "../libs/url";

export default function Navbar({}) {
	return (
		<>
			<div className="container mx-auto my-4 flex w-10/12 justify-around gap-2 xl:w-1/2">
				<ul className="text-3xl">
					<li>
						<ButtonTransparent href="/" className="text-3xl">
							Lowkey
						</ButtonTransparent>
					</li>
				</ul>
				<ul className="text-1xl m-0 flex list-none items-center space-x-4 p-0 text-gray-400">
					<li>
						<ButtonTransparent href="/">Test</ButtonTransparent>
					</li>
					<li>
						<ButtonTransparent href="/duel">Duel</ButtonTransparent>
					</li>
					<li>
						<ButtonTransparent href="/leaderboard">
							Leaderboard
						</ButtonTransparent>
					</li>
					<li>
						<ButtonTransparent href="/about">
							About
						</ButtonTransparent>
					</li>
					<li>
						<LoginButton />
					</li>
				</ul>
			</div>
		</>
	);
}

const LoginButton = ({ ...props }) => {
	const { state, dispatch } = useContext(AuthContext);
	const isAuth = state.isAuth;

	const logoutHandler = async (e: Event) => {
		e.preventDefault();

		if (!state.isAuth) {
			Router.push("/login");
			return;
		}

		const result = await fetch(`${getBaseUrl()}/api/logout`);

		dispatch({ type: "CHANGE_AUTH", state: false });
		Router.push("/");
		return;
	};

	return (
		<ButtonTransparent
			className=""
			onClick={logoutHandler}
			href="#"
			{...props}
		>
			{isAuth ? "Logout" : "Login"}
		</ButtonTransparent>
	);
};
