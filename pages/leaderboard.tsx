import Head from "next/head";
import MainLayout from "../components/main.layout";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../libs/url";
import { CommonHead } from "../components/meta";
import type { DuelEntry, RankEntry, TestsEntry } from "./api/test/leaderboard";
import { TableRow, Table, UserLink } from "../components/table";
import { getLevel } from "../libs/level";

type BoardData = {
	top10: Array<TestsEntry>;
	top10ThisMonth: Array<TestsEntry>;
	recentDuel: Array<DuelEntry>;
	topPlayers: Array<RankEntry>;
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
				<div className="text-primary-content container mx-auto mt-32 pb-52 text-center text-2xl tracking-widest md:w-2/3 xl:w-3/5">
					<article className="text-xl text-gray-400">
						<section>
							<h1 className="text-3xl">Leaderboard</h1>
							<div className="mt-6 flex flex-wrap">
								<TableTest
									data={leaderboard?.top10}
									title="all time top ten"
								/>
								<TableTest
									data={leaderboard?.top10ThisMonth}
									title="monthly top ten"
								/>
								<TableDuel data={leaderboard?.recentDuel} />
								<TableRank data={leaderboard?.topPlayers} />
							</div>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}

function TableTest({
	data,
	title,
}: {
	data: Array<TestsEntry> | undefined;
	title: string;
}) {
	if (data === undefined) return <></>;

	const entries = (
		data.length < 10
			? data.concat(
					new Array(10 - data.length).fill({
						user_id: "",
						wpm: NaN,
						accuracy: NaN,
					})
			  )
			: data
	).map((item, index) => {
		return (
			<TableRow key={`${title}-${index}`}>
				<td className="font-mono font-normal">{index + 1}</td>
				<TestsEntryElement data={item} />
			</TableRow>
		);
	});
	return (
		<Table title={title}>
			<thead className="h-8 bg-slate-800">
				<th className="font-mono font-normal"> </th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					name
				</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					wpm
				</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					acc
				</th>
			</thead>
			<tbody>{entries}</tbody>
		</Table>
	);
}

function TableDuel({ data }: { data: Array<DuelEntry> | undefined }) {
	if (data === undefined) return <></>;
	const entries = (
		data.length < 10
			? data.concat(
					new Array(10 - data.length).fill({
						player1_id: "-",
						player2_id: "-",
						player1: NaN,
						player2: NaN,
						duel_time: "",
						winner: "",
					})
			  )
			: data
	).map((item, index) => {
		return (
			<TableRow key={`duelentry-${index}`}>
				<TableEntryDuel data={item} />
			</TableRow>
		);
	});
	return (
		<Table title="recent duels">
			<thead className="h-8 bg-slate-800">
				<th className="border-cyan-100/10 font-mono font-normal">id</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					wpm
				</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					time
				</th>
			</thead>
			<tbody>{entries}</tbody>
		</Table>
	);
}

function TableRank({ data }: { data: Array<RankEntry> | undefined }) {
	if (data === undefined) return <></>;
	const entries = (
		data.length < 10
			? data.concat(
					new Array(10 - data.length).fill({
						id: "-",
						exp: NaN,
					})
			  )
			: data
	).map((item, index) => {
		return (
			<TableRow key={`duelentry-${index}`}>
				<TableEntryRank data={item} />
			</TableRow>
		);
	});
	return (
		<Table title="player level">
			<thead className="h-8 bg-slate-800">
				<th className="border-cyan-100/10 font-mono font-normal">id</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					level
				</th>
				<th className="border-l-2 border-cyan-100/10 font-mono font-normal">
					points
				</th>
			</thead>
			<tbody>{entries}</tbody>
		</Table>
	);
}

function TestsEntryElement({ data }: { data: TestsEntry }) {
	return (
		<>
			<td className="font-mono font-normal">
				<UserLink name={data.user_id} />
			</td>
			<td className="font-mono font-normal">{data.wpm}</td>
			<td className="font-mono font-normal">
				{Number(data.accuracy) * 100}%
			</td>
		</>
	);
}

function TableEntryDuel({ data }: { data: DuelEntry }) {
	return (
		<>
			<td className="font-mono font-normal ">
				<UserLink name={data.player1_name} /> vs{" "}
				<UserLink name={data.player2_name} />
			</td>
			<td className="font-mono font-normal ">
				{data.player1_wpm}/{data.player2_wpm}
			</td>
			<td className="font-mono font-normal">
				{data.duel_time !== ""
					? Intl.DateTimeFormat("zh-TW").format(
							new Date(data.duel_time)
					  )
					: "-"}
			</td>
		</>
	);
}

function TableEntryRank({ data }: { data: RankEntry }) {
	return (
		<>
			<td className="font-mono font-normal">
				<UserLink name={data.id} />
			</td>
			<td className="font-mono font-normal">{getLevel(data.exp)}</td>
			<td className="font-mono font-normal">{data.exp}</td>
		</>
	);
}
