import "../styles/globals.css";
import { AuthProvider } from "../libs/auth";
import { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
			<Analytics />
		</>
	);
}

export default MyApp;
