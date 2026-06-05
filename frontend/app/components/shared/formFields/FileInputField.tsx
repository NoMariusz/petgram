import { useState } from 'react';

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
	const [fileName, setFileName] = useState('No file selected');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(e.target.files?.[0]?.name ?? 'No file selected');
		onChange(e);
	};

	return (
		<div className='flex flex-col items-start gap-[6px] w-full'>
			<label
				htmlFor={name}
				className='flex items-center gap-1 text-[20px] leading-[25px] text-[#313131] font-normal'
			>
				<span>{label}</span>
				{required && <span aria-hidden='true'>*</span>}
			</label>
			<label
				htmlFor={name}
				className='box-border flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-[10px] border border-[#E6E6E6] bg-[#F0EDE8] px-3 py-2'
			>
				<span className='flex h-9 shrink-0 items-center justify-center rounded-full border border-[#D5D7D3] bg-white px-5 text-sm font-medium text-[#5D4030] shadow-sm transition-colors duration-200 hover:border-[#C7B8AA] hover:bg-[#FAF9F6]'>
					Choose file
				</span>
				<span className='min-w-0 truncate text-sm text-[#5D605C]'>
					{fileName}
				</span>
				<input
					id={name}
					name={name}
					type='file'
					onChange={handleChange}
					accept={accept}
					required={required}
					className='sr-only'
				/>
			</label>
			{error && <p>{error}</p>}
		</div>
	);
}
