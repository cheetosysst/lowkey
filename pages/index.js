import Head from "next/head";
import MainLayout from "../components/main.layout.jsx";
import Test from "../components/test.components.jsx";

export default function Home() {
	return (
		<>
			<MainLayout>
				<div className="container xl:w-3/5 md:w-2/3 mx-auto mt-60 text-2xl tracking-widest text-primary-content text-center">
					<Test />
					<p>
						iusmod qui dolore occaecat Lorem irure commodo
						exercitation.
					</p>
					<p>
						iusmod qui dolore occaecat Lorem irure commodo
						exercitation.
					</p>
					<p>
						iusmod qui dolore occaecat Lorem irure commodo
						exercitation.
					</p>
				</div>
			</MainLayout>
		</>
	);
}
