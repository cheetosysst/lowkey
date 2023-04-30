import Link from "next/link";
import { ButtonTransparent, Button } from "./button.components";
import { useContext } from "react";
import { AuthContext } from "../libs/auth";

export default function Navbar({ children }) {
	const { auth } = useContext(AuthContext);

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
						<ButtonTransparent href={auth ? "/logout" : "/login"}>
							{auth ? "Logout" : "Login"}
						</ButtonTransparent>
					</li>
				</ul>
			</div>
		</>
	);
}
