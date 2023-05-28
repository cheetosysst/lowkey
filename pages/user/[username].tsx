import MainLayout from "../../components/main.layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import conn from "../../libs/database";
import { getLevel } from "../../libs/level";
import { getMonthStart } from "../../libs/misc";
import { CommonHead } from "../../components/meta";
import { useContext } from "react";
import { AuthContext } from "../../libs/auth";
import { Button, ButtonRed } from "../../components/button.components";
import { getBaseUrl } from "../../libs/url";
import { useRouter } from "next/router";

type UserRecord = {
	id: string;
	name: string;
	lvl: number;
	exp: number;
	create_date: string;
};

export default function Page(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const { state, dispatch } = useContext(AuthContext);
	const router = useRouter();

	if (props.notFound)
		return (
			<MainLayout>
				<div className="container mx-auto">Not Found</div>
			</MainLayout>
		);

	const banHandler = () => {
		fetch(`${getBaseUrl()}/api/ban`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				target: props.user?.id,
			}),
		})
			.then((res) => (res.status === 200 ? router.push(`/`) : res.json()))
			.then((data) => console.error(data));
	};

	return (
		<MainLayout>
			<CommonHead
				title={props.user!.name}
				route={`/user/${props.user!.name}`}
			/>
			<div className="container mx-auto mt-12 sm:px-10 lg:px-60">
				<div className="grid grid-cols-2 gap-4 rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40 xl:grid-cols-4">
					<div className="col-span-2 flex gap-8 rounded-md bg-white/10 p-4  transition-all hover:bg-gray-300/20 hover:drop-shadow-md">
						<div className="my-auto h-20 w-20 rounded-full bg-white/50"></div>
						<div className="flex">
							<div className="my-auto flex flex-col text-4xl ">
								<span className="">{props.user?.name}</span>
								<br />
								<span className=" leading-3">
									<span className="text-base leading-6 text-white/50">
										@{props.user?.id}
									</span>
									<span className="ml-2 rounded-md bg-white/10 px-2 text-sm">
										lv.{getLevel(props.user!.exp)}
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col rounded-md bg-white/10 p-4 transition-all hover:bg-gray-300/20 hover:drop-shadow-md">
						<BioData text="test count" value={props.testCount} />
						<BioData text="dual count" value={props.duelCount} />
					</div>
					<div className="flex flex-col rounded-md bg-white/10 p-4 transition-all hover:bg-gray-300/20 hover:drop-shadow-md">
						<BioData
							text="joined date"
							value={Intl.DateTimeFormat("zh-tw").format(
								Date.parse(props.user!.create_date)
							)}
						/>
						<BioData
							text="experience"
							value={`${props.user!.exp} pt`}
						/>
					</div>
					{state.isAdmin ? (
						<ButtonRed
							href="#"
							onClick={banHandler}
							className="mt-3"
						>
							Ban
						</ButtonRed>
					) : (
						<></>
					)}
				</div>
				<div className="mt-8 flex justify-evenly rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40">
					<div>
						<span className="text-white/50">all time:</span>
						<span className="ml-5 text-xl font-medium">
							{getRankText(props.rankAllTime)}
						</span>
					</div>
					<div>
						<span className="text-white/50">this month:</span>
						<span className="ml-5 text-xl font-medium">
							{getRankText(props.rankMonthly)}
						</span>
					</div>
				</div>
				<div className="mt-8 grid grid-cols-4 gap-4 rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40">
					charts
				</div>

				<div className="mt-8 grid grid-cols-4 gap-4 rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40">
					misc
				</div>
			</div>
		</MainLayout>
	);
}

function BioData({
	text,
	value,
	mt = false,
}: {
	text: string;
	value: number | string;
	mt?: boolean;
}) {
	return (
		<>
			<span className={`text-sm text-white/50 ${mt ? "mt-1" : ""}`}>
				{text}
			</span>
			<span className="text-lg leading-5">{value}</span>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<{
	user?: UserRecord;
	notFound: boolean;
	testCount: number;
	rankMonthly: number;
	rankAllTime: number;
	duelCount: number;
}> = async ({ params }) => {
	const username: string | string[] | undefined = params?.username;

	if (typeof username !== "string") return { notFound: true };

	const _result = await conn.transaction(async (tx) => {
		const user = await tx.execute(
			`SELECT id, name, create_date, lvl, exp FROM Account WHERE id="${username}"`
		);
		const test = await tx.execute(
			`SELECT COUNT(*) FROM TypeTest WHERE user_id="${username}";`
		);

		const duel = await tx.execute(
			`SELECT COUNT(*) as duel_count FROM Duel WHERE player1="${username}" OR player2="${username}";`
		);

		const monthStart = getMonthStart();

		const rankMonthly = await tx.execute(`
		SELECT MIN(row_num) as best_rank
		FROM (
			SELECT *, ROW_NUMBER() OVER (ORDER BY wpm DESC) AS row_num
			FROM (
				SELECT wpm, user_id
				FROM TypeTest
				WHERE test_start
					BETWEEN '${monthStart}' AND DATE_ADD('${monthStart}', INTERVAL 1 MONTH)
				ORDER BY wpm ASC
			) AS ranks
		) AS subquery
		WHERE user_id = '${username}';
		`);

		const rankAllTime = await tx.execute(`
		SELECT MIN(row_num) as best_rank
		FROM (
			SELECT *, ROW_NUMBER() OVER (ORDER BY wpm DESC) AS row_num
			FROM (
				SELECT wpm, user_id
				FROM TypeTest
				ORDER BY wpm ASC
			) AS ranks
		) AS subquery
		WHERE user_id = '${username}';
		`);

		return {
			notFound: user.rows.length === 0,
			user: user.rows[0] as UserRecord,
			// @ts-ignore
			testCount: test.rows[0]["count(*)"],
			// @ts-ignore
			duelCount: duel.rows[0]["duel_count"],
			rankMonthly: rankMonthly.rows.length
				? // @ts-ignore
				  rankMonthly.rows[0]["best_rank"]
				: -1,
			rankAllTime: rankAllTime.rows.length
				? // @ts-ignore
				  rankAllTime.rows[0]["best_rank"]
				: -1,
		};
	});

	return {
		props: _result,
	};
};

function getRankText(rank: number) {
	if (rank <= 0) return "NaN";
	return `# ${Intl.NumberFormat("en-US").format(rank)}`;
}
