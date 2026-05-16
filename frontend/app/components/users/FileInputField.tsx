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
				type='file'
				onChange={onChange}
				accept={accept}
				required={required}
				className='box-border p-2 rounded-[10px] border border-[#E6E6E6] bg-[#F0EDE8] px-8 text-[16px] leading-5 text-[#313131] placeholder:text-[#717171] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#7D5739]/20'
			/>
			{error && <p>{error}</p>}
		</div>
	);
}
