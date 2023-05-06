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
			} animate-pulse border-2 border-red-500 rounded p-2 mt-4 transition-transform transform `}
			{...props}
		>
			{children}
		</div>
	);
};
