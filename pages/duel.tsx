import MainLayout from "../components/main.layout";
import { CommonHead } from "../components/meta";
import TypeTest from "../components/typetest";
import { TestEndPoint } from "../libs/test";

export default function Page({}) {
	return (
		<MainLayout>
			<CommonHead title="Duel" route="/duel" />
			<div className="container mx-auto px-32 pt-52">
				<TypeTest endpoint={TestEndPoint.DUEL} />
			</div>
		</MainLayout>
	);
}
