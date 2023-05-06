export const FormElement = ({
	type,
	className,
	id,
	text,
	pattern,
	...props
}: {
	type: string;
	className?: string | undefined;
	text: string;
	pattern?: string;
	id: string;
}) => (
	<div className="flex flex-col mb-4" {...props}>
		<label className={``} htmlFor={id}>
			{text}
		</label>
		<input
			type={type}
			className={`text-slate-100
				outline-none cursor-text transition-all duration-200 
				border-2 border-gray-100/20 invalid:border-red-500/70 focus:border-gray-100/50 hover:border-gray-100/80 rounded-md
				bg-transparent p-2 
			${className}`}
			pattern={pattern}
			id={id}
		></input>
	</div>
);

export const FormPassword = ({
	id,
	text,
	...props
}: {
	id: string;
	text: string;
}) => (
	<FormElement
		type="password"
		id={id}
		text={text}
		pattern="^(?=[!-~])[\W_]|\w{1,64}$"
		{...props}
	/>
);

export const FormEnglish = ({
	id,
	text,
	...props
}: {
	id: string;
	text: string;
}) => (
	<FormElement
		type="text"
		id="username"
		text="Username"
		pattern="^\w{1,64}$"
		{...props}
	/>
);

export const FormEmail = ({
	id,
	text,
	...props
}: {
	id: string;
	text: string;
}) => (
	<FormElement
		type="email"
		id="username"
		text="Username"
		pattern="^\w{1,64}$"
		{...props}
	/>
);

export const FormUnicode = ({
	id,
	text,
	...props
}: {
	id: string;
	text: string;
}) => (
	<FormElement
		type="text"
		id={id}
		text={text}
		pattern="\p{L}|\w{1,64}"
		{...props}
	/>
);

export const FormSubmitButton = ({ text, ...props }: { text: string }) => (
	<input
		type="submit"
		className="cursor-pointer bg-transparent border-2 border-gray-100/20 hover:border-black/5 hover:bg-slate-800 transition-all duration-200 p-2 rounded-md text-slate-100"
		value={text}
		{...props}
	/>
);
