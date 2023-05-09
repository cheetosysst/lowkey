import MainLayout from "../../components/main.layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import conn from "../../libs/database";

type UserRecord = {
	id: string;
	name: string;
	lvl: number;
	exp: number;
	create_date: string;
};

export default function Page({
	user,
	notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	if (notFound)
		return (
			<MainLayout>
				<div className="container mx-auto">Not Found</div>
			</MainLayout>
		);

	return (
		<MainLayout>
			<div className="container mx-auto mt-12 sm:px-10 lg:px-60">
				<div className="grid grid-cols-2 gap-4 rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40 xl:grid-cols-4">
					<div className="col-span-2 flex gap-8 rounded-md bg-white/10 p-4 ">
						<div className="my-auto h-20 w-20 rounded-full bg-white/50"></div>
						<div className="flex">
							<div className="my-auto flex flex-col text-4xl ">
								<span className="">{user?.name}</span>
								<br />
								<span className="text-base leading-6 text-white/50">
									@ {user?.id}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col rounded-md bg-white/10 p-4 ">
						<BioData text="test count" value={100} />
						<BioData text="dual count" value={100} mt />
					</div>
					<div className="flex flex-col rounded-md bg-white/10 p-4">
						<BioData text="joined date" value={100} />
						<BioData text="dual count" value={100} mt />
					</div>
				</div>
				<div className="mt-8 flex justify-evenly rounded-lg border-[1px] border-white/20 p-6 transition-colors duration-200 hover:border-white/40">
					<div>
						<span className="text-white/50">all time:</span>
						<span className="ml-5 text-xl font-medium">100 th</span>
					</div>
					<div>
						<span className="text-white/50">this month:</span>
						<span className="ml-5 text-xl font-medium">100 th</span>
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
}> = async ({ params }) => {
	const username: string | string[] | undefined = params?.username;

	if (typeof username !== "string") return { notFound: true };

	const result = await conn.execute(
		`SELECT id, name, create_date, lvl, exp FROM Account WHERE id="${username}"`
	);
	if (result.rows.length !== 1) return { props: { notFound: true } };

	const user = result.rows[0] as UserRecord;

	return {
		props: {
			user: user,
			notFound: false,
		},
	};
};
