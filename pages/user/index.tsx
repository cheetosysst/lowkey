import { useRouter } from "next/router";
import MainLayout from "../../components/main.layout";
import { getBaseUrl } from "../../libs/url";

export default function Page({}) {
	const router = useRouter();
	fetch(`${getBaseUrl()}/api/user`)
		.then((data) => (data.status === 404 ? router.push("/") : data.json()))
		.then((data) => router.push(`${getBaseUrl()}/user/${data.name}`));
	return <MainLayout> </MainLayout>;
}
