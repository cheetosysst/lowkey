import Router from "next/router";
import MainLayout from "../components/main.layout";
import { FormEvent, FormEventHandler, useContext, useState } from "react";
import { AuthContext } from "../libs/auth";
import { getBaseUrl } from "../libs/url";
import { ButtonTransparent } from "../components/button.components";
import { CommonHead } from "../components/meta";
import { WarningMessage } from "../components/message";

interface loginEventHandler extends HTMLFormElement {
	username: HTMLInputElement;
	password: HTMLInputElement;
}

export default function Home() {
	const auth = useContext(AuthContext);
	const [formError, setFormError] = useState(false);
	const [formErrorMessage, setFormErrorMessage] = useState("");

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
			setFormError(true);
			setFormErrorMessage(data.message);
			return; // TODO Add login failed message
		}

		auth.dispatch({ type: "CHANGE_AUTH", state: true });
		Router.push("/");
	};

	return (
		<>
			<CommonHead title="Login" route="/login" />
			<MainLayout>
				<div className="container mx-auto flex justify-center">
					<form onSubmit={loginHandler}>
						<div className="my-4">
							<label className="text-slate-100" id="email">
								Email / Username
							</label>
							<br />
							<input
								type="text"
								className="textarea h-8 resize rounded-md border-2 border-neutral-700 bg-transparent p-2 outline-none"
								id="username"
								autoFocus
								inputMode="text"
							/>
						</div>
						<div className="my-4">
							<label className="text-slate-100" id="password">
								Password
							</label>
							<br />
							<input
								type="password"
								className="textarea h-8 resize rounded-md border-2 border-neutral-700 bg-transparent p-2 outline-none"
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
								className="cursor-pointer rounded-md border-2 border-gray-100/20 bg-transparent p-2 text-slate-100 transition-all duration-200 hover:border-black/5 hover:bg-slate-800"
								value={`Login`}
							></input>
						</div>
						<WarningMessage show={formError}>
							{formErrorMessage}
						</WarningMessage>
					</form>
				</div>
			</MainLayout>
		</>
	);
}
