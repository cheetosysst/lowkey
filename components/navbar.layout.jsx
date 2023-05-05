import Link from "next/link";
import Router from "next/router";
import { ButtonTransparent, Button } from "./button.components";
import { useContext } from "react";
import { AuthContext } from "../libs/auth";
import { getBaseUrl } from "../libs/url";

export default function Navbar({}) {
	return (
		<>
			<div className="container my-4 w-10/12 xl:w-1/2 mx-auto flex gap-2 justify-around">
				<ul className="text-3xl">
					<li>
						<ButtonTransparent href="/" className="text-3xl">
							Lowkey
						</ButtonTransparent>
					</li>
				</ul>
				<ul className="list-none items-center flex space-x-4 m-0 p-0 text-1xl text-gray-400">
					<li>
						<ButtonTransparent href="/">Test</ButtonTransparent>
					</li>
					<li>
						<ButtonTransparent href="/placeholder">
							Leaderboard
						</ButtonTransparent>
					</li>
					<li>
						<ButtonTransparent href="/about">
							About
						</ButtonTransparent>
					</li>
					<li>
						{/* <ButtonTransparent href={auth ? "/logout" : "/login"}>
							{auth ? "Logout" : "Login"}
						</ButtonTransparent> */}
						<LoginButton />
					</li>
				</ul>
			</div>
		</>
	);
}

const LoginButton = ({ ...props }) => {
	const { auth, setAuth } = useContext(AuthContext);

	const logoutHandler = async (e) => {
		e.preventDefault();

		if (!auth) {
			Router.push("/login");
			return;
		}
		const result = await fetch(`${getBaseUrl()}/api/logout`);

		setAuth(false);
		Router.push("/");
	};

	return (
		<ButtonTransparent onClick={logoutHandler} href="#" {...props}>
			{auth ? "Logout" : "Login"}
		</ButtonTransparent>
	);
};
