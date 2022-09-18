import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return <Component className="bg-slate-900" {...pageProps} />;
}

export default MyApp;
