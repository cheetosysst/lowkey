import Router from "next/router";
import MainLayout from "../components/main.layout";
import { FormEvent, FormEventHandler, useContext } from "react";
import { AuthContext } from "../libs/auth";
import { getBaseUrl } from "../libs/url";
import { ButtonTransparent } from "../components/button.components";

interface loginEventHandler extends HTMLFormElement {
	username: HTMLInputElement;
	password: HTMLInputElement;
}

export default function Home() {
	const auth = useContext(AuthContext);

	if (auth.state.isAuth) {
		Router.push("/");
	}

	const loginHandler: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();

		const target = e.target as loginEventHandler;

		const data = await fetch("./api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: target.username.value,
				password: target.password.value,
			}),
		})
			.then((data) => {
				return data.json();
			})
			.catch((e) => {
				console.error("failed to login", e);
				// TODO add login failed message.
			});

		if (data.message !== "Authorized") {
			console.error("fail to authorize");
			return; // TODO Add login failed message
		}

		auth.dispatch({ type: "CHANGE_AUTH", state: true });
		Router.push("/");
	};

	return (
		<>
			<MainLayout>
				<div className="container mx-auto flex justify-center">
					<form onSubmit={loginHandler}>
						<div className="my-4">
							<label id="email">Email / Username</label>
							<br />
							<input
								type="text"
								className="bg-transparent textarea outline-none resize border-neutral-700 border-2 rounded-md h-8 p-2"
								id="username"
								autoFocus
								inputMode="text"
							/>
						</div>
						<div className="my-4">
							<label id="password">Password</label>
							<br />
							<input
								type="password"
								className="bg-transparent textarea outline-none resize border-neutral-700 border-2 rounded-md h-8 p-2"
								id="password"
								inputMode="text"
							/>
						</div>
						<div className="flex justify-between">
							<ButtonTransparent
								className=""
								href={`${getBaseUrl()}/register`}
							>
								Register
							</ButtonTransparent>
							<input
								type="submit"
								className="cursor-pointer bg-transparent border-2 border-gray-100/20 hover:border-black/5 hover:bg-slate-800 transition-all duration-200 p-2 rounded-md text-slate-100"
								value={`Login`}
							></input>
						</div>
					</form>
				</div>
			</MainLayout>
		</>
	);
}
