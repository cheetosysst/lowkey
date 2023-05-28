import { ReactNode } from "react";

export const WarningMessage = ({
	show,
	className,
	children,
	...props
}: {
	show: Boolean;
	children?: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={`${className} ${
				show ? "scale-y-100" : "scale-y-0"
			} mt-4 transform animate-pulse rounded border-2 border-red-500 p-2 transition-transform `}
			{...props}
		>
			{children}
		</div>
	);
};
