import MainLayout from "../components/main.layout";
import TypeTest from "../components/typetest";

export default function Page({}) {
	return (
		<MainLayout>
			<div className="container mx-auto px-32 pt-52">
				<TypeTest />
			</div>
		</MainLayout>
	);
}
