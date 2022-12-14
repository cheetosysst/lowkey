import Head from "next/head";
import { useEffect, useState } from "react";
import { CommandPanel } from "../components/command.component.jsx";

import MainLayout from "../components/main.layout.jsx";
import Test from "../components/test.components.jsx";

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
			</Head>
			<MainLayout>
				<div className="container xl:w-3/5 md:w-2/3 mx-auto mt-60 text-2xl tracking-widest text-primary-content text-center">
					<Test panelStatus={showPanel} />
				</div>
			</MainLayout>
			<CommandPanel show={showPanel} />
		</>
	);
}
