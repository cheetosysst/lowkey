import Head from "next/head";

import MainLayout from "../components/main.layout";

import ArticleLink from "../components/articleLink.component";
import MetaTags from "../components/meta";

export default function About() {
	return (
		<>
			<Head>
				<title>Lowkey</title>
				<MetaTags
					name="About - Lowkey"
					image="https://lowkey.thect.cc/Lowkey.png"
					url="https://lowkey.thect.cc/about"
					description="Yet another minimalistic typing test because why not lol"
				/>
			</Head>
			<MainLayout>
				<div className="text-primary-content container mx-auto mt-32 text-center text-2xl tracking-widest md:w-2/3 xl:w-3/5">
					<article className="text-xl text-gray-400">
						<section>
							<h1 className="mb-8 text-4xl text-gray-100">
								About
							</h1>
							<p className="mb-6">
								Lowkey is a typing test inspired by{" "}
								<ArticleLink
									name="MonkeyType"
									href="https://monkeytype.com"
								/>
								{" and "}
								<ArticleLink
									name="TypeTest.io"
									href="https://typetest.io"
								/>
								.
							</p>
							<p className="mb-6">
								This project started out as a side project, to
								understand how a typing test works and practice
								frontend development skills.
							</p>
						</section>
						<section>
							<h2 className="mt-12 mb-4 text-2xl text-gray-100">
								Warning
							</h2>
							<p className="mb-6">
								This website is still under development at the
								moment. Testing results may not reflect
								user&apos;s actual typing skill.
							</p>
							<p className="mb-6">
								Please compare the result with other proven
								typing test platform if you decide to use Lowkey
								for typing practice.
							</p>
						</section>
						<section>
							<h2 className="mt-12 mb-4 text-2xl text-gray-100">
								Contact
							</h2>
							<p className="mb-6">
								File an issue on our{" "}
								<ArticleLink
									name="Github Repo"
									href="https://github.com/cheetosysst/lowkey/issues"
								/>{" "}
								if you noticed a new bug.
							</p>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}
