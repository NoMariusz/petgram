import type { ReactNode } from 'react';

interface FormMainButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: ReactNode;
}

export default function FormMainButton({
	type = 'submit',
	disabled = false,
	children,
}: FormMainButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className='w-full h-[48px] rounded-[20px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] text-[#FFF7F4] text-base font-medium tracking-[0.25px] flex items-center justify-center shadow-sm cursor-pointer'
		>
			{children}
		</button>
	);
}
