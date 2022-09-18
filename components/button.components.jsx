import Link from "next/link";

function Button({ children, href, ...props }) {
	return (
		<Link passHref href={href}>
			<a {...props}>{children}</a>
		</Link>
	);
}

function ButtonNavbar({ children, className, ...props }) {
	return (
		<Button
			className={`bg-slate-800 p-2 rounded-md text-slate-100 ${className}`}
			{...props}
		>
			{children}
		</Button>
	);
}

function ButtonTransparent({ children, className, ...props }) {
	return (
		<Button
			className={`bg-transparent hover:bg-slate-800 transition-all duration-200 p-2 rounded-md text-slate-100 ${className}`}
			{...props}
		>
			{children}
		</Button>
	);
}

export { Button, ButtonNavbar, ButtonTransparent };
