interface FormTextareaProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	error?: string;
	placeholder?: string;
	maxLength?: number;
	rows?: number;
}

export default function FormTextarea({
	label,
	name,
	value,
	onChange,
	required = false,
	error,
	placeholder,
	maxLength,
	rows = 4,
}: FormTextareaProps) {
	return (
		<div>
			<label htmlFor={name}>
				{label}
				{required && <span>*</span>}
			</label>
			<textarea
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				maxLength={maxLength}
				rows={rows}
				required={required}
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
