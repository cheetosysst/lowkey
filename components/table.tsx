import Link from "next/link";
import { ReactNode } from "react";
import { getBaseUrl } from "../libs/url";

export function Table({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	return (
		<div className="mx-auto mb-10 w-[25em]">
			<div className="mb-3 text-2xl">{title}</div>
			<table className="w-[25em] table-auto overflow-hidden rounded-md">
				{children}
			</table>
		</div>
	);
}

export function TableRow({ children, ...props }: { children: ReactNode }) {
	return (
		<tr
			className={`border-b-2 border-white/10 leading-10 transition-all duration-75 hover:bg-slate-700/20`}
			{...props}
		>
			{children}
		</tr>
	);
}

export function UserLink({ name }: { name: string }) {
	return (
		<Link href={`${getBaseUrl()}/user/${name}`}>
			<a>{name}</a>
		</Link>
	);
}
