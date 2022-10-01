import { useEffect, useState, useRef } from "react";

function CommandPanel({ ...props }) {
	const panelInput = useRef(null);

	useEffect(() => {
		console.log(props);
	}, [props]);

	useEffect(() => {
		panelInput.current.value = "";
		panelInput.current.focus();
	}, [props.show]);

	const keydownHandler = (e) => {
		if (e.keyCode != 13) return;
		e.preventDefault();
	};

	return (
		<>
			<div
				className={`absolute flex w-screen h-screen top-0 z-10 ${
					props.show ? "" : "hidden"
				} justify-center backdrop-blur-sm`}
			>
				<div className="flex mt-40 align-middle bg-neutral-800 overflow-hidden rounded-2xl shadow-md w-1/3 h-1/2">
					<form className="h-10 w-full">
						<input
							ref={panelInput}
							onKeyDown={keydownHandler}
							type="text"
							className="h-10 w-full bg-neutral-700 border-none outline-none shadow-md px-5 py-4"
						/>
					</form>
				</div>
			</div>
		</>
	);
}

export { CommandPanel };
