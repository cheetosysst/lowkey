import { getBaseUrl } from "../libs/url";

export function CommonHead({
	title,
	route,
	description = "a minimal typing test",
}: {
	title: string;
	route: string;
	description?: string;
}) {
	// TODO use URL
	return (
		<>
			<MetaTags
				title={`Lowkey | ${title}`}
				url={`${getBaseUrl()}${route}`}
				description={description}
				name="Lowkey"
			/>
			<title>{`Lowkey | ${title}`}</title>
		</>
	);
}

export default function MetaTags({
	title,
	url,
	description,
	name,
	image = "Lowkey.png",
}: {
	title: string;
	url: string;
	description: string;
	name: string;
	image?: string;
}) {
	// https://github.com/cheetosysst/maraho/blob/main/components/meta.component.jsx
	return (
		<>
			<meta name="description" content={description} />
			<meta property="og:url" content={`${url}`} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={`${description}`} />
			<meta property="og:image" content={`${getBaseUrl()}/${image}`} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content={`${url}`} />
			<meta property="twitter:url" content={`${url}`} />
			<meta name="twitter:title" content={`${name}`} />
			<meta name="twitter:description" content={`${description}`} />
			<meta name="twitter:image" content={`${getBaseUrl()}/${image}`} />
		</>
	);
}
