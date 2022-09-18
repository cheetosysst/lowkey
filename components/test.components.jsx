import { useEffect } from "react";

export default function Test({ ...props }) {
	useEffect(() => {
		const keyDownHandler = (e) => console.log(`You pressed ${e.code}.`);
		document.addEventListener("keydown", keyDownHandler);

		// clean up
		return () => {
			console.log("cleanup");
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, []);

	return <div {...props}>123</div>;
}
