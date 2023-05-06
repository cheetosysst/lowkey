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
		className={`bg-slate-800 p-2 rounded-md text-slate-100 ${
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
		className={`bg-transparent hover:bg-slate-800 transition-all duration-200 p-2 rounded-md text-slate-100 ${
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
