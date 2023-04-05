import Head from "next/head";

import MainLayout from "../components/main.layout.jsx";

import ArticleLink from "../components/articleLink.component.jsx";

export default function About() {
	return (
		<>
			<Head>
				<title>Lowkey</title>
			</Head>
			<MainLayout>
				<div className="container xl:w-3/5 md:w-2/3 mx-auto mt-32 text-2xl tracking-widest text-primary-content text-center">
					<article className="text-xl text-gray-400">
						<section>
							<h1 className="text-gray-100 text-4xl mb-8">
								Oh wait ... it's not implemented?
							</h1>
							<h2 className="text-gray-100 text-2xl italic mb-8">
								🔫 Always has been
							</h2>
							<p className="mb-6">
								Yeah, I'm too busy recently, and even when I
								have time, I don't really feel like doing
								anything productive here.
							</p>
							<p className="mb-6">
								Checkout lowkey's{" "}
								<ArticleLink
									name="repo"
									href="https://github.com/cheetosysst/lowkey"
								/>
								.
							</p>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}
