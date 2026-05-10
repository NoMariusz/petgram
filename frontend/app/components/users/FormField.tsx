interface FormFieldProps {
	label: string;
	name: string;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	error?: string;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
}

export default function FormField({
	label,
	name,
	type = 'text',
	value,
	onChange,
	required = false,
	error,
	placeholder,
	minLength,
	maxLength,
}: FormFieldProps) {
	return (
		<div>
			<label htmlFor={name}>
				{label}
				{required && <span>*</span>}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
