import Link from "next/link";

export default function ArticleLink({ name, href, ...props }) {
	return (
		<Link href={href} {...props}>
			<a className="text-cyan-600 underline" target={"_blank"}>
				{name}
			</a>
		</Link>
	);
}
