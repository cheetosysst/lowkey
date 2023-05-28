import Navbar from "./navbar.layout";
import { useState, useEffect, ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState("dark");

	// I know, I know... This is awful. Change
	useEffect(() => {
		document.body.classList.add("bg-neutral-900");
	}, []);

	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
