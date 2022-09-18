import Navbar from "./navbar.layout.jsx";

export default function MainLayout({ children }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
