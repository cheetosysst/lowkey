import MainLayout from "../components/main.layout";
import TypeTest from "../components/typetest";
import { TestEndPoint } from "../libs/test";

export default function Page({}) {
	return (
		<MainLayout>
			<div className="container mx-auto px-32 pt-52">
				<TypeTest endpoint={TestEndPoint.DUEL} />
			</div>
		</MainLayout>
	);
}
