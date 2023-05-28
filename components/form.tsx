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
	<div className="mb-4 flex flex-col" {...props}>
		<label className={`text-slate-100`} htmlFor={id}>
			{text}
		</label>
		<input
			type={type}
			className={`cursor-text
				rounded-md border-2 border-gray-100/20 bg-transparent 
				p-2 text-slate-100 outline-none transition-all duration-200 invalid:border-red-500/70
				hover:border-gray-100/80 focus:border-gray-100/50 
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
		id={id}
		text={text}
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
}) => <FormElement type="email" id={id} text={text} {...props} />;

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
		className="cursor-pointer rounded-md border-2 border-gray-100/20 bg-transparent p-2 text-slate-100 transition-all duration-200 hover:border-black/5 hover:bg-slate-800"
		value={text}
		{...props}
	/>
);
