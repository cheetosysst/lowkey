import Router from "next/router";
import MainLayout from "../components/main.layout";
import { useContext } from "react";
import { AuthContext } from "../libs/auth";

export default function Home() {
	const { auth, setAuth } = useContext(AuthContext);

	const loginHandler = async (e) => {
		e.preventDefault();

		const result = await fetch("./api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: e.target.id.value,
				password: e.target.password.value,
			}),
		}).catch((e) => {
			console.error("failed to login", e);
			// TODO add login failed message.
		});

		const data = await result.json();

		if (data.message !== "Authorized") {
			console.log("fail to authorize");
			return; // TODO Add login failed message
		}

		setAuth(true);
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
								id="id"
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
						<div className="flex justify-end">
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
