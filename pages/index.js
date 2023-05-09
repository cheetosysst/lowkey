import Head from "next/head";
import { useEffect, useState } from "react";
import { CommandPanel } from "../components/command.component";

import MainLayout from "../components/main.layout";
import Test from "../components/test.components";
import MetaTags from "../components/meta";

export default function Home() {
	const [showPanel, setShowPanel] = useState(false);

	useEffect(() => {
		const panelToggle = (e) => {
			if (e.key !== "Escape") return;

			if (showPanel) {
				setShowPanel(false);
				return;
			}

			setShowPanel(true);
		};

		window.addEventListener("keydown", panelToggle);

		return () => {
			window.removeEventListener("keydown", panelToggle);
		};
	}, [showPanel]);

	return (
		<>
			<Head>
				<title>Lowkey</title>
				<MetaTags
					name="Lowkey"
					image="https://lowkey.thect.cc/Lowkey.png"
					url="https://lowkey.thect.cc/"
					description="Yet another minimalistic typing test because why not lol"
					title=""
				/>
			</Head>
			<MainLayout>
				<div className="text-primary-content container mx-auto mt-60 text-center text-2xl tracking-widest md:w-2/3 xl:w-3/5">
					<Test panelStatus={showPanel} />
				</div>
			</MainLayout>
			<CommandPanel show={showPanel} />
		</>
	);
}
