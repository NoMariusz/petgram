import type { ReactNode } from 'react';

interface FormSecondaryButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	children: ReactNode;
}

export default function FormSecondaryButton({
	type = 'button',
	disabled = false,
	children,
}: FormSecondaryButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className='w-full h-[48px] rounded-[20px] bg-white border border-[#DADCE0] text-[#3C4043] text-base font-medium tracking-[0.25px] flex items-center justify-center shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
		>
			{children}
		</button>
	);
}
