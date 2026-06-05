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
			className='w-full h-[48px] rounded-[20px] bg-gradient-to-br from-[#7D5739] to-[#FECAA5] text-[#FFF7F4] text-base font-medium tracking-[0.25px] flex items-center justify-center shadow-sm cursor-pointer transition-all duration-200 hover:brightness-[1.02] hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D5739]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100 disabled:hover:shadow-sm disabled:active:scale-100'
		>
			{children}
		</button>
	);
}
