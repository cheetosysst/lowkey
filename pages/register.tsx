import MainLayout from "../components/main.layout";
import { FormEventHandler, useState } from "react";
import type { ReactElement } from "react";
import Router from "next/router";

interface registerEventHandler extends HTMLFormElement {
	username: HTMLInputElement;
	email: HTMLInputElement;
	password: HTMLInputElement;
	nickname: HTMLInputElement;
}

export default function Home(): ReactElement {
	const loginHandler: FormEventHandler = async (e) => {
		e.preventDefault();
		const target = e.target as registerEventHandler;

		const body = {
			username: target.username.value,
			nickname: target.nickname.value,
			password: target.password.value,
			email: target.email.value,
		};
		console.log(target.email.validity);

		const result = await fetch("./api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		const data = await result.json();
		if (data.instruction === "login") Router.push("/login");
	};

	return (
		<>
			<MainLayout>
				<div className="container mx-auto flex justify-center">
					<form onSubmit={loginHandler}>
						<FormElement
							type="text"
							id="username"
							text="Username"
							pattern="[0-9a-zA-Z]{1,64}"
						/>
						<FormElement
							type="password"
							id="password"
							text="Password"
							pattern="[0-9a-zA-Z]{1,64}"
						/>
						<FormElement type="email" id="email" text="Email" />
						<FormElement
							type="text"
							id="nickname"
							text="Nickname"
							pattern="*{1,64}"
						/>
						<div className="flex justify-end">
							<input
								type="submit"
								className="cursor-pointer bg-transparent border-2 border-gray-100/20 hover:border-black/5 hover:bg-slate-800 transition-all duration-200 p-2 rounded-md text-slate-100"
								value={`Register`}
							></input>
						</div>
					</form>
				</div>
			</MainLayout>
		</>
	);
}

const validateEmail = (email: string) => {};

const FormElement = ({
	type,
	className,
	id,
	text,
	pattern,
	...props
}: {
	type: string;
	className?: string | undefined;
	text: string;
	pattern?: string;
	id: string;
}) => (
	<div className="flex flex-col mb-4">
		<label htmlFor={id}>{text}</label>
		<input
			type={type}
			className={`text-slate-100
				outline-none cursor-text transition-all duration-200 
				border-2 valid:border-gray-100/20 focus:border-gray-100/50 hover:border-gray-100/80 invalid:border-red-500 rounded-md
				bg-transparent p-2  ${className}`}
			pattern={pattern}
			id={id}
			{...props}
		></input>
	</div>
);
