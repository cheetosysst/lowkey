import { NextApiRequest, NextApiResponse } from "next";
import { Auth, getAuth } from "../../../libs/auth";
import conn from "../../../libs/database";
import { getMonthStart, sqlTimestamp } from "../../../libs/misc";

export type TestsEntry = { user_id: string; wpm: number; accuracy: number };
export type DuelEntry = {
	player1_name: string;
	player2_name: string;
	player1_wpm: number;
	player2_wpm: number;
	duel_time: string;
	winner: string;
};
export type RankEntry = {
	id: string;
	exp: number;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth: Auth | undefined = getAuth(req);

	const [top10, recentDuel, topPlayers, top10ThisMonth] =
		await conn.transaction(async (tx) => {
			const top10 = await tx.execute(
				`SELECT user_id, wpm, accuracy FROM TypeTest ORDER BY wpm desc LIMIT 10;`
			);

			const monthStart = getMonthStart();
			const top10ThisMonth = await tx.execute(`
				SELECT user_id, wpm, accuracy
				FROM TypeTest
				WHERE test_start BETWEEN '${monthStart}' AND DATE_ADD('${monthStart}', INTERVAL 1 MONTH)
				ORDER BY wpm DESC
				LIMIT 10;
			`);

			const recentDuel = await tx.execute(`
				SELECT
					Duel.player1 AS player1_name,
					Duel.player2 AS player2_name,
					TypeTest1.wpm AS player1_wpm,
					TypeTest2.wpm AS player2_wpm,
					Duel.duel_time AS duel_time,
					Duel.winner AS winner
				FROM Duel
				JOIN TypeTest AS TypeTest1 ON Duel.p1_test = TypeTest1.id
				JOIN TypeTest AS TypeTest2 ON Duel.p2_test = TypeTest2.id
				WHERE Duel.player2 IS NOT NULL
				ORDER BY Duel.duel_time DESC
				LIMIT 10;
			`);

			const topPlayers = await tx.execute(
				`SELECT id, exp FROM Account ORDER BY exp DESC LIMIT 10;`
			);

			return [
				top10.rows,
				recentDuel.rows,
				topPlayers.rows,
				top10ThisMonth.rows,
			];
		});

	res.status(200).json({
		top10: top10 as Array<TestsEntry>,
		recentDuel: recentDuel as Array<DuelEntry>,
		topPlayers: topPlayers as Array<RankEntry>,
		top10ThisMonth: top10ThisMonth as Array<TestsEntry>,
	});
}
