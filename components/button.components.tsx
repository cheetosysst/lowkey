import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProp {
	href?: string;
	children?: ReactNode;
	className?: string;
	onClick?: any;
}

const Button = ({
	children,
	href,
	className,
	onClick,
	...props
}: ButtonProp) => (
	<Link passHref href={href ? href : ""}>
		<a {...props} className={className} onClick={onClick}>
			{children}
		</a>
	</Link>
);

const ButtonNavbar = ({
	children,
	href,
	className,
	onClick,
	...props
}: ButtonProp) => (
	<Button
		className={`rounded-md bg-slate-800 p-2 text-slate-100 ${
			className ? className : ""
		}`}
		href={href}
		onClick={onClick}
		{...props}
	>
		{children}
	</Button>
);

const ButtonTransparent = ({
	children,
	className,
	onClick,
	href,
	...props
}: ButtonProp) => (
	<Button
		className={`rounded-md bg-transparent p-2 text-slate-100 transition-all duration-200 hover:bg-slate-800 ${
			className ? className : ""
		}`}
		href={href}
		onClick={onClick}
		{...props}
	>
		{children}
	</Button>
);

export { Button, ButtonNavbar, ButtonTransparent };
