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
		<div className='flex flex-col items-start gap-[6px] w-full'>
			<label
				htmlFor={name}
				className='flex items-center gap-1 text-[20px] leading-[25px] text-[#313131] font-normal'
			>
				<span>{label}</span>
				{required && <span aria-hidden='true'>*</span>}
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
				className='box-border w-full h-[68px] rounded-[10px] border border-[#E6E6E6] bg-[#F0EDE8] px-12 text-[16px] leading-5 text-[#313131] placeholder:text-[#717171] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#7D5739]/20'
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
