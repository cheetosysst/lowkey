export default function WPM({ wpm, show, ...props }) {
	const visible = wpm === undefined || wpm === null || wpm === 0 || !show;
	return (
		<div
			className={`mt-10 transition-all duration-300 ${
				visible ? "text-transparent" : " text-white"
			} `}
			{...props}
		>
			WPM: {wpm}
		</div>
	);
}
