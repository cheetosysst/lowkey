import Head from "next/head";
import MainLayout from "../components/main.layout";
import MetaTags from "../components/meta";
import { ArticleLink } from "../components/button.components";

export default function Page() {
	return (
		<>
			<Head>
				<title>Lowkey</title>
				<MetaTags
					name="Placeholder - Lowkey"
					image="https://lowkey.thect.cc/Lowkey.png"
					url="https://lowkey.thect.cc/placeholder"
					description="Placeholder page for all the feature that's planned but not yet implemented (and likely never will LOL)."
				/>
			</Head>
			<MainLayout>
				<div className="text-primary-content container mx-auto mt-32 text-center text-2xl tracking-widest md:w-2/3 xl:w-3/5">
					<article className="text-xl text-gray-400">
						<section>
							<h1 className="mb-8 text-4xl text-gray-100">
								Oh wait ... it{"'"}s not implemented?
							</h1>
							<h2 className="mb-8 text-2xl italic text-gray-100">
								🔫 Always has been
							</h2>
							<p className="mb-6">
								Yeah, I{"'"}m too busy recently, and even when I
								have time, I don{"'"}t really feel like doing
								anything productive here.
							</p>
							<p className="mb-6">
								Checkout lowkey{"'"}s{" "}
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
