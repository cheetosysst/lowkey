import MainLayout from "../components/main.layout";
import { FormEvent, FormEventHandler, useState } from "react";
import type { ReactElement } from "react";
import Router from "next/router";
import { getBaseUrl } from "../libs/url";
import { WarningMessage } from "../components/message";
import {
	FormEmail,
	FormEnglish,
	FormPassword,
	FormSubmitButton,
	FormUnicode,
} from "../components/form";
import Head from "next/head";
import { CommonHead } from "../components/meta";

interface registerEventHandler extends HTMLFormElement {
	username: HTMLInputElement;
	email: HTMLInputElement;
	password: HTMLInputElement;
	nickname: HTMLInputElement;
}

export default function Home(): ReactElement {
	const [formError, setFormError] = useState(false);
	const [formErrorMessage, setFormErrorMessage] = useState("");

	const loginHandler: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();

		const target = e.target as registerEventHandler;

		if (!target.checkValidity()) {
			setFormError(true);
			setFormErrorMessage("Invalid input, please check again");
			return;
		}

		const body = {
			username: target.username.value,
			nickname: target.nickname.value,
			password: target.password.value,
			email: target.email.value,
		};

		const result = await fetch(`${getBaseUrl()}/api/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await result.json();
		if (data.message === "login") Router.push("/login");

		setFormError(true);
		setFormErrorMessage(data.full_message);
	};

	return (
		<MainLayout>
			<Head>
				<CommonHead title="Register" route="/register" />
			</Head>
			<div className="container mx-auto flex justify-center">
				<form onSubmit={loginHandler}>
					<FormEnglish id="username" text="Username" />
					<FormPassword id="password" text="Password" />
					<FormEmail id="email" text="Email" />
					<FormUnicode id="nickname" text="Nickname" />
					<div className="flex justify-end">
						<FormSubmitButton text="Register" />
					</div>
					<WarningMessage show={formError}>
						{formErrorMessage}
					</WarningMessage>
				</form>
			</div>
		</MainLayout>
	);
}
