interface FileInputFieldProps {
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	error?: string;
	accept?: string;
}

export default function FileInputField({
	label,
	name,
	onChange,
	required = false,
	error,
	accept = 'image/*',
}: FileInputFieldProps) {
	return (
		<div>
			<label htmlFor={name}>
				{label}
				{required && <span>*</span>}
			</label>
			<input
				id={name}
				name={name}
				type='file'
				onChange={onChange}
				accept={accept}
				required={required}
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
