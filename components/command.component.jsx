import { useEffect, useState, useRef } from "react";

function CommandPanel({ ...props }) {
	const panelInput = useRef(null);

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
				className={`absolute top-0 z-10 flex h-screen w-screen ${
					props.show ? "" : "hidden"
				} justify-center backdrop-blur-sm`}
			>
				<div className="mt-40 flex h-1/2 w-1/3 overflow-hidden rounded-2xl bg-neutral-800 align-middle shadow-md">
					<form className="h-10 w-full">
						<input
							ref={panelInput}
							onKeyDown={keydownHandler}
							type="text"
							className="h-10 w-full border-none bg-neutral-700 px-5 py-4 shadow-md outline-none"
						/>
					</form>
				</div>
			</div>
		</>
	);
}

export { CommandPanel };
