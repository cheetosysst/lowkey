import Navbar from "./navbar.layout.jsx";
import { useState, useEffect } from "react";

export default function MainLayout({ children }) {
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
