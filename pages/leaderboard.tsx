import Head from "next/head";
import MainLayout from "../components/main.layout";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../libs/url";
import Link from "next/link";
import { CommonHead } from "../components/meta";

type BoardEntry = {
	user_id: string;
	wpm: number;
	accuracy: string;
};

type BoardData = {
	top10: Array<BoardEntry>;
	userTop: BoardEntry | undefined;
};

export default function Page() {
	const [leaderboard, setLeaderboard] = useState<BoardData>();

	useEffect(() => {
		fetch(`${getBaseUrl()}/api/test/leaderboard`)
			.then((data) => data.json())
			.then((data) => setLeaderboard(data))
			.catch((e) => console.error(e));
	}, []);

	return (
		<>
			<MainLayout>
				<Head>
					<title>Lowkey</title>
					<CommonHead title="Home" route="/" />
				</Head>
				<div className="text-primary-content container mx-auto mt-32 text-center text-2xl tracking-widest md:w-2/3 xl:w-3/5">
					<article className="text-xl text-gray-400">
						<section>
							<h1 className="text-3xl">Leaderboard</h1>
							<div className="mt-6 flex justify-center">
								<Board data={leaderboard} />
							</div>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}

function Board({ data }: { data: BoardData | undefined }) {
	// TODO Refactor
	const table =
		data === undefined
			? new Array(10).fill({ user_id: "-", wpm: NaN, accuracy: "0" })
			: data.top10.length < 10
			? data.top10.concat(
					new Array(10 - data.top10.length).fill({
						user_id: "-",
						wpm: NaN,
						accuracy: "0",
					})
			  )
			: data.top10;

	return (
		<>
			<table className="w-96 table-auto overflow-hidden rounded-md">
				<tbody>
					<tr className="bg-slate-800">
						<th className="font-mono font-normal">rank</th>
						<th className="font-mono font-normal">name</th>
						<th className="font-mono font-normal">wpm</th>
						<th className="font-mono font-normal">acc</th>
					</tr>
					{table.map((item, index) => {
						return (
							<TableEntry
								data={item}
								rank={index + 1}
								key={`board-${index}`}
							/>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

function TableEntry({ data, rank }: { data: BoardEntry; rank: number }) {
	return (
		<tr
			className={`border-b-2 border-white/10 leading-10 transition-all duration-75 hover:bg-slate-700/20`}
		>
			<td className="font-mono font-normal">{rank}</td>
			<td className="font-mono font-normal">
				<Link href={`${getBaseUrl()}/user/${data.user_id}`} passHref>
					{data.user_id}
				</Link>
			</td>
			<td className="font-mono font-normal">{data.wpm}</td>
			<td className="font-mono font-normal">
				{Number(data.accuracy) * 100}%
			</td>
		</tr>
	);
}
