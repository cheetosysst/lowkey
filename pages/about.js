import Head from "next/head";
import Link from "next/link";

import MainLayout from "../components/main.layout.jsx";

export default function About() {
	const articleLink = (name, href) => {
		return (
			<Link href={href}>
				<a className="text-cyan-600 underline" target={"_blank"}>
					{name}
				</a>
			</Link>
		);
	};

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
								About
							</h1>
							<p className="mb-6">
								Lowkey is a typing test inspired by{" "}
								{articleLink(
									"MonkeyType",
									"https://monkeytype.com"
								)}
								{" and "}
								{articleLink(
									"TypeTest.io",
									"https://typetest.io"
								)}
								.
							</p>
							<p className="mb-6">
								This project started out as a side project, to
								understand how a typing test works and practice
								frontend development skills.
							</p>
						</section>
						<section>
							<h2 className="text-gray-100 text-2xl mt-12 mb-4">
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
							<h2 className="text-gray-100 text-2xl mt-12 mb-4">
								Contact
							</h2>
							<p className="mb-6">
								File an issue on our{" "}
								{articleLink(
									"Github Repo",
									"https://github.com/cheetosysst/lowkey/issues"
								)}{" "}
								if you noticed a new bug.
							</p>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}
