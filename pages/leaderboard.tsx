import Head from "next/head";
import MainLayout from "../components/main.layout";
import {
	Component,
	FC,
	ReactElement,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { getBaseUrl } from "../libs/url";
import Link from "next/link";
import { CommonHead } from "../components/meta";
import type { DuelEntry, TestsEntry } from "./api/test/leaderboard";

type BoardData = {
	top10: Array<TestsEntry>;
	recentDuel: Array<DuelEntry>;
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
							<div className="mt-6 flex">
								<TableTest data={leaderboard?.top10} />
								<TableDuel data={leaderboard?.recentDuel} />
							</div>
						</section>
					</article>
				</div>
			</MainLayout>
		</>
	);
}

function Table({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="mx-auto mb-10 w-[25em]">
			<div className="mb-3 text-2xl">{title}</div>
			<table className="w-[25em] table-auto overflow-hidden rounded-md">
				{children}
			</table>
		</div>
	);
}

function TableRow({ children, ...props }: { children: ReactNode }) {
	return (
		<tr
			className={`border-b-2 border-white/10 leading-10 transition-all duration-75 hover:bg-slate-700/20`}
			{...props}
		>
			{children}
		</tr>
	);
}

function TableTest({ data }: { data: Array<TestsEntry> | undefined }) {
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
			<TableRow key={`testentry-${index}`}>
				<td className="font-mono font-normal">{index + 1}</td>
				<TestsEntryElement data={item} />
			</TableRow>
		);
	});
	return (
		<Table title="monthly top 10">
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
						player1_id: "",
						player2_id: "",
						player1: NaN,
						player2: NaN,
						duel_time: "",
						winner: "",
					})
			  )
			: data
	).map((item, index, arr) => {
		console.log(arr);
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

function UserLink({ name }: { name: string }) {
	return (
		<Link href={`${getBaseUrl()}/user/${name}`}>
			<a>{name}</a>
		</Link>
	);
}
