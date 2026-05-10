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

export default function FormTextareaField({
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
		<div className='flex flex-col items-start w-full gap-[6px]'>
			<label
				htmlFor={name}
				className='flex items-center gap-1 text-[20px] leading-[25px] text-[#313131] font-normal'
			>
				<span>{label}</span>
				{required && <span aria-hidden='true'>*</span>}
			</label>
			<div className='relative box-border w-full h-[136px] rounded-[10px] border border-[#E6E6E6] bg-[#F0EDE8]'>
				<textarea
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					maxLength={maxLength}
					rows={rows}
					required={required}
					className='h-full w-full resize-none rounded-[10px] bg-transparent px-12 py-5 text-[16px] leading-5 text-[#313131] placeholder:text-[#717171] placeholder:font-normal focus:outline-none'
				/>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute bottom-[15px] right-[-3px] h-4 w-4'
				>
					<span className='absolute left-0 top-0 h-[36px] w-px rotate-[45deg] bg-[#717171]' />
					<span className='absolute left-[3px] top-[9px] h-[26px] w-px rotate-[45deg] bg-[#717171]' />
					<span className='absolute left-[7px] top-[17px] h-[16px] w-px rotate-[45deg] bg-[#5D605C]' />
				</div>
			</div>
			{error && <p>{error}</p>}
		</div>
	);
}
